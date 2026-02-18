
export const submitOrderFake = async (orderData) => {
 return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...orderData,
              status: "pending",
      });
    }, 1000); 
  });
};