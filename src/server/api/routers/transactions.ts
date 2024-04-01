import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export const transactionRouter = createTRPCRouter({
  createBankAccount: protectedProcedure
    .input(
      z.object({
        accountName: z.string(),
        accountBalance: z.number(),
        accountNumber: z.number(),
        routingNumber: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session?.user?.id;

        if (!userId) {
          throw new Error("User session not found");
        }

        const user = await ctx.db.user.findUnique({
          where: {
            id: userId,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const existingAccount = await ctx.db.bankAccount.findUnique({
          where: {
            accountName_createdById: {
              accountName: input.accountName,
              createdById: userId,
            },
          },
        });

        if (existingAccount?.createdById === userId) {
          throw new Error(
            `You already have an account named ${existingAccount.accountName}`,
          );
        }

        const newAccount = {
          accountName: input.accountName,
          accountNumber: input.accountNumber,
          routingNumber: input.routingNumber,
          accountBalance: input.accountBalance,
          createdById: userId,
        };

        const createdAccount = await ctx.db.bankAccount.create({
          data: newAccount,
        });

        console.log("Account created");
        return createdAccount;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to create bank account");
      }
    }),

  // create a new transaction
  createTransaction: protectedProcedure
    .input(
      z.object({
        receiverName: z.string(),
        receiverBank: z.string(),
        transactionType: z.string(),
        amount: z.string(),
        transactionAccountId: z.string() || undefined,
        receiverAccountNumber: z.string(),
        receiverRoutingNumber: z.string(),
        transactionStatus: z.string(),
        transactionDate: z.date(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const parsedAmount = parseFloat(input.amount);

      // Fetch the selected account based on transactionAccountId
      const selectedAccount = await ctx.db.bankAccount.findUnique({
        where: { id: input.transactionAccountId },
      });

      if (!selectedAccount) {
        throw new Error("Selected account not found");
      }

      if (input.transactionStatus === "Completed") {
        let updatedBalance: number;

        if (input.transactionType === "credit") {
          updatedBalance = selectedAccount.accountBalance + parsedAmount;
        } else if (input.transactionType === "debit") {
          const remainingBalance =
            selectedAccount.accountBalance - parsedAmount;

          if (remainingBalance < 0) {
            throw new Error(
              "Insufficient funds. Transaction cannot be processed.",
            );
          }

          updatedBalance = remainingBalance;
        } else {
          throw new Error("Invalid transaction type");
        }

        // Update the selected account's balance
        await ctx.db.bankAccount.update({
          where: { id: input.transactionAccountId },
          data: { accountBalance: updatedBalance },
        });
      }

      // Create the transaction in the database
      const createdTransaction = await ctx.db.transaction.create({
        data: {
          receiverName: input.receiverName,
          receiverBank: input.receiverBank,
          amount: parsedAmount.toString(),
          transactionType: input.transactionType,
          transactionAccountId: input.transactionAccountId,
          receiverAccountNumber: input.receiverAccountNumber,
          receiverRoutingNumber: input.receiverRoutingNumber,
          transactionStatus: input.transactionStatus,
          transactionDate: input.transactionDate,
          createdById: ctx.session.user.id,
          description: input.description,
        },
      });

      return {
        message: "Transaction created successfully",
        data: {
          transactionId: createdTransaction.id,
          receiverName: createdTransaction.receiverName,
          amount: input.amount,
        },
      };
    }),

  transfer: protectedProcedure
    .input(
      z.object({
        receiverName: z.string(),
        receiverBank: z.string(),
        transactionType: z.string(),
        amount: z.string(),
        pin: z.string(),
        transactionAccountId: z.string(),
        transactionAccount: z.string(),
        receiverAccountNumber: z.string(),
        receiverRoutingNumber: z.string(),
        transactionStatus: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const validate = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      console.log(validate);

      if (validate && input.pin !== validate?.pin.toString()) {
        throw new Error(`You have entered an incorrect pin`);
      }

      const parsedAmount = parseFloat(input.amount);

      // Fetch the selected account based on transactionAccountId
      const selectedAccount = await ctx.db.bankAccount.findUnique({
        where: { id: input.transactionAccountId },
      });

      if (!selectedAccount) {
        throw new Error("Selected account not found");
      }

      input.transactionStatus === "Pending";

      if (input.transactionStatus === "Completed") {
        let updatedBalance: number;

        if (input.transactionType === "credit") {
          updatedBalance = selectedAccount.accountBalance + parsedAmount;
        } else if (input.transactionType === "debit") {
          const remainingBalance =
            selectedAccount.accountBalance - parsedAmount;

          if (remainingBalance < 0) {
            throw new Error(
              "Insufficient funds. Transaction cannot be processed.",
            );
          }

          updatedBalance = remainingBalance;
        } else {
          throw new Error("Invalid transaction type");
        }

        // Update the selected account's balance
        await ctx.db.bankAccount.update({
          where: { id: input.transactionAccountId },
          data: { accountBalance: updatedBalance },
        });
      }
      const createdTransaction = await ctx.db.transaction
        .create({
          data: {
            receiverName: input.receiverName,
            receiverBank: input.receiverBank,
            amount: parsedAmount.toString(),
            transactionType: "debit",
            transactionAccountId: input.transactionAccountId,
            receiverAccountNumber: input.receiverAccountNumber,
            receiverRoutingNumber: input.receiverRoutingNumber,
            transactionStatus: "Pending",
            transactionDate: new Date(),
            createdById: ctx.session.user.id,
            description: input.description,
          },
        })
        .then((value) => {
          const data = {
            message: "Transaction is Being Processed",
            ...value,
          };
        })
        .catch((error) => {
          throw new Error(`${"An Error Occured wiith this Transaction"}`);
        });
    }),

  // get all user accounts
  getAllUserAccount: protectedProcedure.query(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    if (!user) {
      throw new Error("User not found, NOT AUTHORIZED");
    }

    const accounts = await ctx.db.bankAccount.findMany({
      where: {
        createdById: user.id,
      },
    });

    console.log(accounts);
    return accounts;
  }),

  getAllRecentTransactionsByCurrentMonth: protectedProcedure
    // .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        // Get the current date
        const currentDate = new Date();

        // Extract the start date of the current month (set to the 1st day)
        const startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1,
        );

        // Extract the end date of the current month (set to the last day)
        const endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0,
        );

        // Fetch transactions within the current month based on userId
        const transactions = await ctx.db.transaction.findMany({
          where: {
            createdById: ctx.session.user.id,
            transactionDate: {
              gte: startDate, // Filter transactions with transactionDate greater than or equal to startDate
              lte: endDate, // Filter transactions with transactionDate less than or equal to endDate
            },
          },
          orderBy: {
            transactionDate: "desc", // Sort by transactionDate in descending order
          },
        });

        // If there are no transactions for the month, retrieve all other transactions
        if (transactions.length === 0) {
          const allTransactions = await ctx.db.transaction.findMany({
            where: {
              createdById: ctx.session.user.id,
              NOT: {
                transactionDate: {
                  gte: startDate,
                  lte: endDate,
                },
              },
            },
            orderBy: {
              transactionDate: "desc", // Sort by transactionDate in descending order
            },
          });

          console.log(allTransactions); // Log other transactions (for demonstration purposes)
          return allTransactions;
        }

        console.log(transactions); // Log transactions for the current month (for demonstration purposes)
        return transactions;
      } catch (error) {
        // console.error(error);
        throw new Error(
          "Failed to fetch recent transactions for the current month",
        );
      }
    }),

  getAllTransactions: protectedProcedure
    // .input(z.object({ page: z.number(), pageSize: z.number() }))
    .query(async ({ ctx, input }) => {
      // const { page, pageSize } = input;  Destructure page and pageSize from input

      const transactions = await db.transaction.findMany({
        // skip: (page - 1) * pageSize,
        // take: pageSize,
        where: {
          createdById: ctx.session.user?.id,
        },
      });

      return transactions;
    }),

  deleteTransaction: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.transaction.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getAccountByTransaction: protectedProcedure.query(async ({ ctx }) => {
    const recentTransactions = await ctx.db.transaction.findMany({
      where: {
        createdById: ctx.session.user.id,
      },
      take: 4, // Limit to 5 transactions
      orderBy: {
        createdAt: "desc", // Order by transaction date, descending
      },
    });

    return recentTransactions;
  }),
  deleteAllTransactions: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.transaction.deleteMany({
      where: {
        createdById: ctx.session.user.id,
      },
    });
  }),
});
