import { expect, test, vi } from 'vitest'
import { createUser, } from '~/models/user.server'
import { editFinancialDetails } from '~/models/financial.server'
import prisma from 'lib/__mocks__/prisma'

 vi.mock('../lib/prisma')

test('Testing creating a new user',async () => {
    const newUser = {email : 'user@prisma.com', password : 'Prisma123'}
    const { email, password } = newUser

    prisma.user.create.mockResolvedValue({...newUser, id: '1'})
    const user = await createUser(email, password)

    expect(user).toStrictEqual({ ...newUser, id: 1, });
})

test('Testing creating a new user',async () => {

    // const newUser = {email : 'user@prisma.com', password : 'Prisma123'}
    // const { email, password } = newUser

    // prisma.user.create.mockResolvedValue({...newUser, id: '1'})
    // const user = await createUser(email, password)

    // expect(user).toStrictEqual({ ...newUser, id: 1, });
})


// test('Testing adding financial details', async () => {
//     const financialDetailsData = {
//       balance: 3333,
//       income: 3333,
//       savings: 3333,
//       userId: "clre2urum0000r426y91gdva0",
//     };

//     prisma.financialDetails.create.mockResolvedValue({...})
  
//     const financialDetails = await editFinancialDetails(financialDetailsData);
  
//     expect(financialDetails).toStrictEqual({
//         balance: 3333,
//         income: 3333,
//         savings: 3333,
//         userId: "clre2urum0000r426y91gdva0",
//         id: expect.any(String), // Assuming the id returned is a string
//         createdAt: "2024-01-14T22:38:26.137Z"
//     });
// });


