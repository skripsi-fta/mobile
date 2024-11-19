import type { FieldError } from 'react-hook-form';
import {
    TextInput as DefaultTextInput,
    TextInputProps,
    View
} from 'react-native';
import { CustomText } from './CustomText';

type TextInputCustomProps = TextInputProps & {
    error?: FieldError | undefined;
};

export const TextInput = (props: TextInputCustomProps) => {
    const {
        style,
        editable = true,
        numberOfLines = 1,
        maxLength = 255,
        error,
        ...otherProps
    } = props;

    return (
        <View>
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
                        borderWidth: 1
                    },
                    style
                ]}
                {...otherProps}
            />
            {!!error?.message && (
                <CustomText
                    style={{ color: '#ef4444', marginTop: 4, marginLeft: 4 }}
                    type='verysmall'
                >
                    {error.message}
                </CustomText>
            )}
        </View>
    );
};
