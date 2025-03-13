export const successResponse = (message, data = "") => {
  return {
    success: true,
    message,
    data
  }
}

export const failResponse = (message, data = "") => {
  return {
    success: false,
    message, 
    data
  }
}
