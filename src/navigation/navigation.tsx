import * as React from 'react';
import { createDrawerNavigator, DrawerNavigationOptions } from '@react-navigation/drawer';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LoginView } from '../view/login/login.view';
import { HomeView } from '../view/home/home.view';
import { Text, View } from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';
import { NoiseTechHeaderComponent } from '../component/header/header.component';
import { ProjectsView } from '../view/projects/projects.view';
import { ProjectEditionView } from '../view/projects/views/project-edition/project-edition.view';
import { ProjectDetailView } from '../view/projects/views/project-detail/project-detail.view';
import { NewEvaluationView } from '../view/projects/views/new-evaluation/new-evaluation.view';
import { NoiseMeasurementView } from '../view/projects/views/noise-measurement/noise-measurement.view';
import { NoiseReceptorsView } from '../view/projects/views/noise-receptors/noise-receptors.view';
import { NoiseSourcesView } from '../view/projects/views/noise-sources/noise-sources.view';
import { NoiseReceptorView } from '../view/projects/views/noise-receptors/view/noise-receptor/noise-receptor.view';
import { NoiseSourceView } from '../view/projects/views/noise-sources/view/noise-source/noise-source.view';
import { BackgroundNoiseMeasurementView } from '../view/projects/views/noise-measurement/views/background-noise-measurement/background-noise-measurement.view';
import { MeasurementEnvironmentView } from '../view/projects/views/noise-measurement/views/measurement-environment/measurement-environment.view';
import { NoiseEmittingSourceView } from '../view/projects/views/noise-measurement/views/noise-emiting-source/noise-emiting-source.view';
import { SetLocationView } from '../view/set-location/set-location.view';
import { MapSelectorView } from '../view/set-location/views/map/map.view';
import SessionKeeper from '../keepers/session.keeper';
import { FinalizeView } from '../view/projects/views/finalize/finalize';
import { MenuView } from '../view/menu/menu.view';
import { ClientsView } from '../view/projects/views/clients/clients';

export type DrawerNavigationParams = {
  Menu: any,
  Login: any,
  Clients: any,
  Home: any,
  Projects: any,
  AppStack: any,
  ProjectEdition: any,
  ProjectDetail: any,
  NewEvaluation: any,
  NoiseMeasurement: any,
  NoiseReceptors: any,
  NoiseSources: any,
  NoiseReceptor: any,
  NoiseSource: any,
  BackgroundNoiseMeasurement: any,
  MeasurementEnvironment: any,
  NoiseEmittingSource: any,
  Map: any,
  SetLocation: any,
  Finalize: any
};


const Drawer = createDrawerNavigator();

const screenOptions: StackNavigationOptions = {
  header: ({ navigation, route, options }) => {
    const title = getHeaderTitle(options, route.name);

    return <NoiseTechHeaderComponent navigation={navigation} options={options}/>;
  },
  headerMode: 'float'
};


const HomeStack = createStackNavigator();
const HomeNavigationStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeView}
       
      />
      <HomeStack.Screen
        name="Login"
        component={LoginView}
       
      />
    </HomeStack.Navigator>
  );
};

const AppStack = createStackNavigator();
export const AppNavigationStack = () => {
  return (
    <AppStack.Navigator screenOptions={screenOptions}>
      <AppStack.Screen
        name="Home"
        component={HomeView}
       
      />
      <AppStack.Screen
        name="Login"
        component={LoginView}
       
      />
      <AppStack.Screen
        name="Clients"
        component={ClientsView}
       
      />
      <AppStack.Screen
        name="Projects"
        component={ProjectsView}
       
      />
      <AppStack.Screen
        name="ProjectEdition"
        component={ProjectEditionView}
       
      />
      <AppStack.Screen
        name="ProjectDetail"
        component={ProjectDetailView}
       
      />
      <AppStack.Screen
        name="Finalize"
        component={FinalizeView}
       
      />
      <AppStack.Screen
        name="NewEvaluation"
        component={NewEvaluationView}
       
      />
      <AppStack.Screen
        name="NoiseMeasurement"
        component={NoiseMeasurementView}
       
      />
      <AppStack.Screen
        name="NoiseReceptors"
        component={NoiseReceptorsView}
       
      />
      <AppStack.Screen
        name="NoiseSources"
        component={NoiseSourcesView}
       
      />
      <AppStack.Screen
        name="NoiseReceptor"
        component={NoiseReceptorView}
       
      />
      <AppStack.Screen
        name="NoiseSource"
        component={NoiseSourceView}
       
      />
      <AppStack.Screen
        name="BackgroundNoiseMeasurement"
        component={BackgroundNoiseMeasurementView}
       
      />
      <AppStack.Screen
        name="MeasurementEnvironment"
        component={MeasurementEnvironmentView}
       
      />
      <AppStack.Screen
        name="NoiseEmittingSource"
        component={NoiseEmittingSourceView}
       
      />
      <AppStack.Screen
        name="SetLocation"
        component={SetLocationView}
       
      />
      <AppStack.Screen
        name="Map"
        component={MapSelectorView}
       
      />
      <AppStack.Screen
        name='Menu'
        component={MenuView}
        options={{
          presentation: 'transparentModal'
        }}
      />
    </AppStack.Navigator>
  );
};

export const NavigationDrawer = () => {
  return (
    <NavigationContainer>
      <AppNavigationStack></AppNavigationStack>
    </NavigationContainer>
  );
};

