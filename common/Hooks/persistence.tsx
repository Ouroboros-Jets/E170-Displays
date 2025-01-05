import { useState } from 'react';

declare function GetStoredData(property: string, defaultValue?: string);
declare function SetStoredData(property: string, newValue: string);

export class FsDataStorage {
	/**
	 * @param key Property Key
	 * @param defaultValue default value if not set
	 */
	static get(key: string, defaultValue?: string) {
		const value = GetStoredData(`E170_${key}`);
		if (!value) {
			return defaultValue;
		}
		return value;
	}
	/**
	 *
	 * @param key Property key
	 * @param value Value to set
	 */
	static setter(key: string, value: string) {
		SetStoredData(`E170_${key}`, value);
	}
}
export const usePersistentProperty = (
	propertyName: string,
	defaultValue: string
): [string, (string) => void] => {
	const [properyValue, rawPropertysetter] = useState(() =>
		FsDataStorage.get(propertyName, defaultValue)
	);

	const propertySetter = (value: string) => {
		FsDataStorage.setter(propertyName, value);
		rawPropertysetter(value);
	};
	return [properyValue, propertySetter];
};

export const usePersistentPropertyWithDefault = (
	propertyName: string,
	defaultValue: string
): [string, (string) => void] => {
	const [properyValue, rawPropertysetter] = useState(() =>
		FsDataStorage.get(propertyName, defaultValue)
	);

	const propertySetter = (value: string) => {
		FsDataStorage.setter(propertyName, value);
		rawPropertysetter(value);
	};
	return [properyValue, propertySetter];
};
