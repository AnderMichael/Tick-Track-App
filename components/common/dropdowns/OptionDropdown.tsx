import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

interface OptionItemDropdown {
    label: string;
    value: number;
}

interface OptionDropdownProps {
    data?: OptionItemDropdown[];
    value: string | OptionItemDropdown | null;
    onChange: (item: { label: string; value: number }) => void;
    placeholder: string;
    dropdownHeight?: number;
    disabled?: boolean;
}

const OptionDropdown: React.FC<OptionDropdownProps> = ({
    data = [],
    value,
    onChange,
    placeholder = "Semestre",
    dropdownHeight = 200,
    disabled = false,
}) => {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <Dropdown
            disable={disabled}
            autoScroll={false}
            style={[
                {
                    height: 50,
                    borderColor: isFocus ? 'black' : 'gray',
                    borderWidth: 1.2,
                    borderRadius: 10,
                    paddingHorizontal: 12,
                    marginHorizontal: 20,
                    opacity: disabled ? 0.5 : 1,
                    backgroundColor: value !== null ? 'white' : undefined,
                },
            ]}
            maxHeight={dropdownHeight}
            labelField="label"
            valueField="value"
            data={data}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder={placeholder}
            itemTextStyle={{
                fontFamily: 'Outfit_400Regular',
                fontSize: 16,
                color: 'gray',
            }}
            placeholderStyle={{
                fontFamily: 'Outfit_400Regular',
                fontSize: 16,
                fontWeight: '600',
                color: isFocus ? 'black' : 'gray',
                textAlign: 'left',
            }}
            onChange={item => {
                onChange(item);
                setIsFocus(false);
            }}
            containerStyle={{
                borderBottomStartRadius: 10,
                borderBottomEndRadius: 10,
                overflow: 'hidden',
                borderWidth: 0.5,
                borderColor: isFocus ? 'black' : 'gray',
            }}
            selectedTextStyle={{
                fontFamily: 'Outfit_400Regular',
                textAlign: 'left',
                fontWeight: '600',
                color: 'black',
            }}
        />
    );
};

export default OptionDropdown;