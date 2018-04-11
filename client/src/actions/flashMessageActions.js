export const FLASH_MESSAGE = 'FLASH_MESSAGE';

export const sendFlashMessage = (message, className, img) => {

  return {
    type: FLASH_MESSAGE,
    payload: {
      message,
      className,
      img
    }
  }
};