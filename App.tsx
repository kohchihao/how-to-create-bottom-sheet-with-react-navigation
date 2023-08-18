import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const navigateToModal = () => {
    navigation.navigate('Modal');
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>

      <Button title="Open Modal" onPress={navigateToModal} />
    </View>
  );
};

const ModalScreen = () => {
  const navigation = useNavigation<any>();

  const onClose = () => {
    navigation.canGoBack() && navigation.navigate('Home');
  };
  const top = useSafeAreaInsets().top;
  return (
    <View style={styles.root}>
      <View style={[{ height: top }, styles.emptyContainer]} />
      <View style={styles.contentContainer}>
        <View style={styles.modalHeaderContainer}>
          <Button title="close" onPress={onClose} />
          <Text>Hello World</Text>
          <Button title="save"></Button>
        </View>
        <Text>Hello</Text>
      </View>
    </View>
  );
};

const Overlay = () => {
  return <View style={{ backgroundColor: '#0000005f', flex: 1 }} />;
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={{
            ...TransitionPresets.ModalSlideFromBottomIOS,
            presentation: 'transparentModal',
            cardOverlayEnabled: true,
            headerTitleAlign: 'center',
            headerShown: false,
            cardOverlay: Overlay,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  emptyContainer: {
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  modalHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
