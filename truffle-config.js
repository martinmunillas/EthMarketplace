module.exports = {
  test_file_extension_regexp: /.*\.js$/,
  migrations_file_extension_regexp: /.*\.js$/,
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      gasLimit: 3000,
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      version: "^0.8.10",
    },
  },
};
