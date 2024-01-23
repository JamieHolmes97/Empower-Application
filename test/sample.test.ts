import { expect, test, vi } from 'vitest'
import { createUser, } from '~/models/user.server'
import { editFinancialDetails } from '~/models/financial.server'
import prisma from 'lib/__mocks__/prisma'
import bcrypt from "bcryptjs";

 vi.mock('../lib/prisma')

// test('Testing creating a new user',async () => {
//     const newUser = {email : 'user@prisma.com', password : 'Prisma123'}
//     const { email, password } = newUser

//     prisma.user.create.mockResolvedValue({...newUser, id: '1'})
//     const user = await createUser(email, password)

//     expect(user).toStrictEqual({ ...newUser, id: 1, });
// })

//test('Testing creating a new user',async () => {
    // const newUser = {email : 'user@prisma.com', password : 'Prisma123'}
    // const { email, password } = newUser

    // prisma.user.create.mockResolvedValue({...newUser, id: '1'})
    // const user = await createUser(email, password)

    // expect(user).toStrictEqual({ ...newUser, id: 1, });
//})


test('Testing adding financial details', async () => {
    const financialDetailsData = {
      balance: 3333,
      income: 3333,
      savings: 3333,
      userId: "clre2urum0000r426y91gdva0",
    //   createdAt: new Date,
    //   updatedAt: new Date
    };

    //prisma.financialDetails.create.mockResolvedValue({...})
  
    const financialDetails = await editFinancialDetails(financialDetailsData);
  
    expect(financialDetails).toStrictEqual({
        balance: 3333,
        income: 3333,
        savings: 3333,
        userId: "clre2urum0000r426y91gdva0",
        id: expect.any(String),
        createdAt: financialDetails.createdAt,
        updatedAt: financialDetails.updatedAt
    });
});

// test('Testing adding financial details', async () => {

//     const newUser = {email : 'user@prisma.com', password : 'Prisma123'}
//       const { email, password } = newUser
    
//     //prisma.financialDetails.create.mockResolvedValue({...})
  
//     const user = await createUser(email, password);
  
//     expect(user).toStrictEqual({
//         email : 'user@prisma.com',
//         password : 'Prisma123',
//         createdAt: user.createdAt,
//         updatedAt: user.updatedAt
//     });
// });

test('Testing adding financial details', async () => {
    const newUser = { email: 'userrr@prisma.com', password: 'Prisma123' };
    const { email, password } = newUser;

    const user = await createUser(email, password);

    expect(user.email).toBe('userrr@prisma.com');
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
});



