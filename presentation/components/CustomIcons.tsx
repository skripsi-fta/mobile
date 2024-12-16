// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import {
    AntDesign,
    MaterialIcons,
    type FontAwesome5,
    FontAwesome,
    Entypo,
    FontAwesome6
} from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type ComponentProps } from 'react';
import type { StyleProp, TextStyle } from 'react-native';

type IonIcons = ComponentProps<typeof Ionicons>['name'];
type AntDesignIcons = ComponentProps<typeof AntDesign>['name'];
type MaterialIcons = ComponentProps<typeof MaterialIcons>['name'];
type FontAwesome5Icons = ComponentProps<typeof FontAwesome5>['name'];
type EntypoIcons = ComponentProps<typeof Entypo>['name'];
type FontAwesome6Icons = ComponentProps<typeof FontAwesome6>['name'];

type IconType =
    | {
          type: 'ion';
          name: IonIcons;
          style?: StyleProp<TextStyle>;
          color?: string;
          size?: number;
      }
    | {
          type: 'ant-design';
          name: AntDesignIcons;
          style?: StyleProp<TextStyle>;
          color?: string;
          size?: number;
      }
    | {
          type: 'material';
          name: MaterialIcons;
          style?: StyleProp<TextStyle>;
          color?: string;
          size?: number;
      }
    | {
          type: 'awesome5';
          name: FontAwesome5Icons;
          style?: StyleProp<TextStyle>;
          color?: string;
          size?: number;
      }
    | {
          type: 'entypo';
          name: EntypoIcons;
          style?: StyleProp<TextStyle>;
          color?: string;
          size?: number;
      }
    | {
          type: 'awesome6';
          name: FontAwesome6Icons;
          style?: StyleProp<TextStyle>;
          color?: string;
          size?: number;
      };

export function CustomIcons({ style = {}, type, name, ...rest }: IconType) {
    if (type == 'ion') {
        return <Ionicons size={28} style={[style]} name={name} {...rest} />;
    } else if (type === 'ant-design') {
        return <AntDesign size={28} style={[, style]} name={name} {...rest} />;
    } else if (type === 'material') {
        return (
            <MaterialIcons size={28} style={[, style]} name={name} {...rest} />
        );
    } else if (type === 'awesome5') {
        return (
            <FontAwesome size={28} style={[, style]} name={name} {...rest} />
        );
    } else if (type === 'entypo') {
        return <Entypo size={28} style={[, style]} name={name} {...rest} />;
    } else if (type === 'awesome6') {
        return (
            <FontAwesome6 size={28} style={[, style]} name={name} {...rest} />
        );
    }

    return null;
}
