export const FLASH_MESSAGE = 'FLASH_MESSAGE';

export const sendFlashMessage = (message, className, button) => {

  return {
    type: FLASH_MESSAGE,
    payload: {
      message,
      className,
      button
    }
  }
};