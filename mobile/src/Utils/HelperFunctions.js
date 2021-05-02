import { launchImageLibrary } from 'react-native-image-picker';
import { check, checkMultiple, PERMISSIONS, request } from 'react-native-permissions';
import Storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { Linking, Platform } from 'react-native';

const DB = firestore();

export const keyGenerator = () => Math.random().toString(36).slice(2);

export const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const CheckPermissions = async (permission, callback) => {
  await check(permission)
    .then(async (result) => {
      switchPermissionResult(result, permission, callback);
    })
    .catch((error) => {
      // console.log('erro in permissions', error.message);
      return { error };
    });
};

export const requestPermission = async (permission) => {
  try {
    await request(permission).then((result) => {
      // console.log('PERMISSION', permission);
      switchPermissionResult(result, permission);
    });
  } catch (error) {
    return { error };
  }
};

const switchPermissionResult = (result, permission, callback) => {
  try {
    switch (result) {
      case 'unavailable':
        console.log('This feature is not available (on this device / in this context)');
        return { error: 'Permissison denied', granted: false };
      case 'denied':
        console.log('The permission has not been requested / is denied but requestable');
        return requestPermission(permission, callback);
      case 'limited':
        return requestPermission(permission, callback);
      case 'granted':
        console.log('The permission is granted');
        // return { error: null, granted: true };
        return callback();
      case 'blocked':
        console.log('The permission is denied and not requestable anymore');
        break;
    }
  } catch (error) {
    return { error };
  }
};

export const ImagePicker = (callback, opts = { maxWidth: 1024, maxHeight: 768, quality: 0.5 }) => {
  // if(CheckPermissions(PERMISSIONS.ANDROID.CAMERA) !== 'granted')
  const options = {
    title: 'Select Photo',
    // customButtons: [ { name: 'fb', title: 'Choose Photo from Gallery' } ],
    storageOptions: {
      skipBackup: true
      // path: 'images'
    },
    ...opts
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      // console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      console.log('Responsefile size mbs -->', response.fileSize, 'filanme -->', response.fileName);
      callback(response);
    }
  });
};

export const uploadImage = async (storagePath, imagePath, setProgress, setError, callback) => {
  const storageRef = Storage().ref();
  const uploadTask = storageRef.child(`${storagePath}`).putFile(imagePath);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // console.log('Progress ------', snapshot.bytesTransferred / snapshot.totalBytes * 100);
      setProgress(Math.ceil(snapshot.bytesTransferred / snapshot.totalBytes * 100));
    },
    (error) => setError(error),
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        callback(downloadURL);
      });
    }
  );
};

export const addUsersInfoToArray = async (array, field = 'uid', callback) => {
  try {
    const userIds = [ ...array.map((usr) => usr[field]) ];
    // console.log('User ids', userIds);
    const userData = await DB.collection('Users').where('uid', 'in', userIds).get();
    const users = [ ...userData.docs.map((user) => ({ ...user.data(), uid: user.id })) ];
    const finalArray = array.map((usr) => ({ ...usr, userInfo: users.find((usx) => usx.uid === usr[field]) }));

    return callback({ doc: finalArray, error: undefined });
  } catch (error) {
    return callback({ error: error.message, doc: undefined });
  }
};

// Splits array of n-size into size of 10 since its the limit for firestore in operator in the above function
const getArraychunks = (array, size) => {
  var results = [];
  while (array.length) {
    results.push(array.splice(0, size));
  }
  // console.log('CHUNK', results);
  return results;
};

export const callNumber = (phone) => {
  // console.log('callNumber ----> ', phone);
  let phoneNumber = phone;
  if (Platform.OS === 'ios') {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        Alert.alert('Phone number is not available');
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => console.log(err));
};

export const CHECK_PERMISSIONS = async (callback) => {
  try {
    await check(
      Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY
      })
    ).then(
      async (res) =>
        res === 'granted'
          ? callback({ success: true, error: undefined })
          : await request(
              Platform.select({
                android: PERMISSIONS.ANDROID.CAMERA,
                ios: PERMISSIONS.IOS.PHOTO_LIBRARY
              })
            ).then((resp) => callback({ success: resp === 'granted' ? true : false }))
    );
  } catch (error) {
    return callback({ success: false, error: error.message });
  }
};

// export const CHECK_GALLERY_PERMISSIONS = async (callback) => {
//   try {
//     // if (_allPermission['android.permission.CAMERA'] !== 'granted')
//       await request(
//         Platform.select({
//           android: PERMISSIONS.ANDROID.CAMERA
//         })
//       ).then((resp) => callback({ success: resp === 'granted' ? true : false }));

//   } catch (error) {
//     return callback({ success: false, error: error.message });
// }
// };
