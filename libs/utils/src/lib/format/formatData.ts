export const formatData = (data: any) => {
    if (data) {
      return { data };
    } else {
      throw new Error("Data Not found!");
    }
  };
  