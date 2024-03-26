import { load } from '../../services/apiServices.js';

export const fontsizes = {
  small:{
    header: 30,
    icon: 40,
    input: 16,
    text: 20,
    question: 20,
  }, 
  medium:{
    header: 40,
    icon: 50,
    input: 20,
    text: 30,
    question: 20,
  }, 
  large: {
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
    if (value !== null) {
      return fontsizes[value.fontSize];
    }
    else{
      return fontsizes.medium;
    }
  }catch (error) {
    console.error('Error getting theme:', error);
    return fontsizes.medium;
  }
}
