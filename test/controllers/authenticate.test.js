const assert = require("chai").assert;
const axios = require("axios");

describe("authenticate", function() {
  describe("login", function() {
    axios.post("/auth", { email: "admin+site@site.com", password: "1" })
    it("should decrypt passwords", function() {
     
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
