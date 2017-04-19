const vendorTest = (module) => {
  return module.resource &&
    /\.js$/.test(module.resource) &&
    /node_modules/.test(module.resource);
};

exports.isVendor = (module) => {
  const vendor = vendorTest(module);
  if (process.env.DEBUG === 'true') {
    if (vendor) {
      console.log(`Vendoring: ${module.resource}`);
    } else {
      console.log(module.resource);
    }
  }
  return vendor;
};
