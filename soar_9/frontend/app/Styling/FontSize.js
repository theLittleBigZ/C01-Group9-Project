import { load } from '../../services/apiServices.js';

export const fontsizes = {
  Small:{
    header: 30,
    icon: 40,
    input: 16,
    text: 20,
    question: 20,
  }, 
  Medium:{
    header: 40,
    icon: 50,
    input: 20,
    text: 30,
    question: 20,
  }, 
  Large: {
    header: 50,
    icon: 60,
    input: 30,
    text: 40,
    question: 30,
  }
};

export const getFontSize = async () => {
  try {
    let value = await load();
    // if (value !== null) {
    //   return fontsizes[value.fontSize];
    // }
      return fontsizes.Medium;
  }catch (error) {
    console.error('Error getting theme:', error);
    return fontsizes.Medium;
  }
}
