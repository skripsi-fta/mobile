import type { FieldError } from 'react-hook-form';
import {
    TextInput as DefaultTextInput,
    TextInputProps,
    View
} from 'react-native';
import { CustomText } from './CustomText';
import { CustomIcons } from './CustomIcons';
import type { ReactElement } from 'react';

type TextInputCustomProps = TextInputProps & {
    error?: FieldError | undefined;
    customIcon?: ReactElement;
};

export const TextInput = (props: TextInputCustomProps) => {
    const {
        style,
        editable = true,
        numberOfLines = 1,
        maxLength = 255,
        error,
        customIcon,
        ...otherProps
    } = props;

    return (
        <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <View style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                <DefaultTextInput
                    keyboardAppearance='dark'
                    editable={editable}
                    numberOfLines={numberOfLines}
                    maxLength={maxLength}
                    selectionColor={'black'}
                    placeholderTextColor={'#888888'}
                    style={[
                        {
                            fontSize: 14,
                            padding: 8,
                            borderRadius: 10,
                            borderWidth: 1,
                            flex: 1
                        },
                        style
                    ]}
                    {...otherProps}
                />
                {customIcon}
            </View>
            {!!error?.message && (
                <CustomText
                    style={{ color: '#ef4444', marginLeft: 4 }}
                    type='verysmall'
                >
                    {error.message}
                </CustomText>
            )}
        </View>
    );
};
