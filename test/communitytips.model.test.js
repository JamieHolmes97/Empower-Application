import { createUser, deleteUserByEmail, deleteUserByEmailAllData } from "../app/models/user.server";
import { createTip, getAllTips, getTipsByUserId, deleteMessage } from "../app/models/tips.server";

describe("Community Tips functionality", () => {
    let userId;

    beforeAll(async () => {
        const email = "test@examplee.com";
        const password = "password123";
        const user = await createUser(email, password);
        userId = user.id;
    });

    afterAll(async () => {
        await deleteUserByEmailAllData("test@examplee.com");
    });

    it("should create a community tip", async () => {
        const name = "BobRoss";
        const university = "UlsterUniversity";
        const message = "Free food today at 4pm";

        const tip = await createTip({
            name: name,
            university: university,
            message: message,
            userId: userId
        });

        expect(tip).toBeDefined();
        expect(tip.name).toBe(name);
        expect(tip.university).toBe(university);
        expect(tip.message).toBe(message);
    });

    it("should retrieve all community tips created by user", async () => {
        
        await createTip({
            name: "JohnDoe",
            university: "Harvard",
            message: "Don't forget to submit your assignments.",
            userId: userId
        });

        await createTip({
            name: "JaneDoe",
            university: "Oxford",
            message: "Join us for a study session in the library.",
            userId: userId
        });

        const retrievedTips = await getTipsByUserId(userId);

        expect(retrievedTips.length).toBe(3); 
    });

    it("should delete a community tip", async () => {

        const tip = await createTip({
            name: "Admin",
            university: "Admin University",
            message: "This is an administrative message.",
            userId: userId
        });

        // Delete the tip
        await deleteMessage(tip.id);

        // Retrieve all tips
        const tips = await getTipsByUserId(userId);

        // Check if the tip is deleted
        expect(tips.length).toBe(3); // Only the previously created tips should remain
    });
});
