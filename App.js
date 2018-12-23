import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './navigations/navigation';
export default class App extends React.Component {
  render() {
    return (
      <AppContainer></AppContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// import React from 'react';
// import { View, Text, Button } from 'react-native';
// import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//         <Button
//           title="Go to Details"
//           onPress={() => {
//             this.props.navigation.dispatch(StackActions.reset({
//               index: 0,
//               actions: [
//                 NavigationActions.navigate({ routeName: 'Details' })
//               ],
//             }))
//           }}
//         />
//       </View>
//     );
//   }  
// }

// class DetailsScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Details Screen</Text>
//       </View>
//     );
//   }  
// }

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: HomeScreen,
//   },
//   Details: {
//     screen: DetailsScreen,
//   },
// }, {
//     initialRouteName: 'Home',
// });

// export default createAppContainer(AppNavigator);