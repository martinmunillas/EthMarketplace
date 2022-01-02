module.exports = {
  test_file_extension_regexp: /.*\.js$/,
  migrations_file_extension_regexp: /.*\.js$/,
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
  },
  contracts_directory: "./src/contracts/",
  compilers: {
    solc: {
      version: "^0.8.10",
    },
  },
};
