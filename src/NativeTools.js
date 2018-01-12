import { AsyncStorage } from 'react-native';
export async function getNativeTokenId(params) {
    let tokenId = await AsyncStorage.getItem('tokenId');
    return tokenId;
}