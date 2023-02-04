const Auth = artifacts.require('Auth');

module.exports = (deployer) => {
  deployer.deploy(Auth);
}