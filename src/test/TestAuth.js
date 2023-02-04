const Auth = artifacts.require("Auth");

contract("Auth", accounts => {
    let auth;

    beforeEach(async () => {
        auth = await Auth.new();
    });

    it("should create a new user", async () => {
        await auth.createUser("user1", accounts[0], "nonce");
        const user = await auth.usersList(accounts[0]);
        assert.equal(user.username, "user1", "username should match");
        assert.equal(user.addr, accounts[0], "address should match");
        assert.equal(user.nonce, web3.utils.keccak256("nonce"), "nonce should match");
    });


    it("should not create a user if address is already registered", async () => {
        await auth.createUser("user1", accounts[0], "nonce");
        try {
            await auth.createUser("user2", accounts[0], "nonce");
        } catch (err) {
            assert.include(err.message, "already registered");
        }
    });

    it("should fetch nonce of a user", async () => {
        await auth.createUser("user1", accounts[0], "nonce");
        const nonce = await auth.fetchNonce.call(accounts[0]);
        assert.isAbove(nonce.length, 0, "nonce should have a length greater than 0");
    });

    it("should not fetch nonce of a user if address is not registered", async () => {
        try {
            await auth.fetchNonce(accounts[0]);
            assert.fail("should have thrown an error");
        } catch (err) {
            assert.include(err.message, "revert");
        }
    });
    

    it("should get the user and update the nonce", async () => {
        // create a user
        await auth.createUser("testuser", accounts[0], "testnonce");
        const user = await auth.usersList(accounts[0]);
        let beforeNonce = user.nonce;

        // call the getUserAndUpdateNonce function
        await auth.getUserAndUpdateNonce(accounts[0]);
        const userUpdated = await auth.usersList(accounts[0]);
        let afterNonce = await userUpdated.nonce;

        assert.equal(userUpdated.username, "testuser", "username should match");
        assert.notEqual(beforeNonce, afterNonce, "nonce should be different before and after the function call");
    });

    it("should generate a random sequence", async () => {
        let randomSequence1 = await auth.generateRandomSequence();
        assert.isAbove(randomSequence1.length, 0, "nonce should have a length greater than 0");
    });

    it('should delete a user', async () => {
        const username = 'testuser';
        const nonce = 'testnonce';
        await auth.createUser(username, accounts[0], nonce);
        await auth.deleteUser(accounts[0]);

        const user = await auth.usersList(accounts[0]);
        assert.equal(user.addr, '0x0000000000000000000000000000000000000000');
    });

});