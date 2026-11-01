import { useId, useState } from 'react';

import { Card, Stack, Tab, TabList, Text } from '@sanity/ui';
import { InputProps, MemberField, ObjectInputProps, ObjectMember } from 'sanity';

const LOCALES = [
    { name: 'am', title: 'Հայերեն', hint: 'Armenian', code: 'AM' },
    { name: 'en', title: 'English', hint: 'English', code: 'EN' },
    { name: 'ru', title: 'Русский', hint: 'Russian', code: 'RU' },
] as const;

export const isLocaleObjectInput = (props: InputProps) => {
    if (props.schemaType?.jsonType !== 'object' || !Array.isArray((props as ObjectInputProps).members)) {
        return false;
    }

    const names = (props as ObjectInputProps).members
        .filter((member): member is Extract<ObjectMember, { kind: 'field' }> => member.kind === 'field')
        .map((member) => member.name);

    return names.length > 0 && names.every((name) => LOCALES.some((locale) => locale.name === name));
};

export const LocaleObjectInput = (props: ObjectInputProps) => {
    const { members, renderField, renderInput, renderItem, renderPreview } = props;
    const fields = members.filter((member): member is Extract<ObjectMember, { kind: 'field' }> => member.kind === 'field');
    const tabId = useId();
    const [active, setActive] = useState(fields[0]?.name || 'am');

    if (fields.length === 0) {
        return props.renderDefault(props);
    }

    const current = LOCALES.find((locale) => locale.name === active) || LOCALES[0];

    return (
        <Stack space={3}>
            <style>{`
                .studio-locale-stage {
                    display: grid;
                }
                .studio-locale-panel {
                    grid-area: 1 / 1;
                    min-width: 0;
                }
                .studio-locale-panel[data-active="false"] {
                    visibility: hidden;
                    pointer-events: none;
                }
                .studio-locale-panel [data-testid$="-title"],
                .studio-locale-panel [data-ui="FieldHeader"] {
                    display: none;
                }
            `}</style>
            <Card padding={2} radius={3} tone="transparent" border>
                <TabList space={1}>
                    {fields.map((member) => {
                        const locale = LOCALES.find((item) => item.name === member.name);
                        if (!locale) return null;

                        return (
                            <Tab
                                key={member.name}
                                id={`${tabId}-${locale.name}`}
                                aria-controls={`${tabId}-panel`}
                                label={`${locale.code}  ${locale.title}`}
                                selected={active === locale.name}
                                onClick={() => setActive(locale.name)}
                            />
                        );
                    })}
                </TabList>
            </Card>
            <Card padding={4} radius={3} border>
                <Stack space={3}>
                    <Stack space={2}>
                        <Text size={1} muted>
                            {current.hint}
                        </Text>
                        <Text size={2} weight="semibold">
                            {current.title}
                        </Text>
                    </Stack>
                    <div className="studio-locale-stage">
                        {fields.map((member) => (
                            <div
                                key={member.key}
                                className="studio-locale-panel"
                                data-active={member.name === active}
                                id={member.name === active ? `${tabId}-panel` : undefined}
                            >
                                <MemberField
                                    member={member}
                                    renderField={renderField}
                                    renderInput={renderInput}
                                    renderItem={renderItem}
                                    renderPreview={renderPreview}
                                />
                            </div>
                        ))}
                    </div>
                </Stack>
            </Card>
        </Stack>
    );
};
