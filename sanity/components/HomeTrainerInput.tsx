'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ObjectInputProps, set, unset, useClient, useFormValue } from 'sanity';
import { Select, Stack, Text } from '@sanity/ui';

import { apiVersion } from '@/sanity/env';

type WorkerOption = {
    _key: string;
    title?: string;
};

const HomeTrainerInput = (props: ObjectInputProps) => {
    const { value, onChange, readOnly } = props;
    const client = useClient({ apiVersion });
    const [options, setOptions] = useState<WorkerOption[]>([]);
    const [loading, setLoading] = useState(true);
    const currentKey = typeof value === 'object' && value && 'workerKey' in value
        ? String((value as { workerKey?: string }).workerKey || '')
        : '';
    const selectedKeys = useFormValue(['trainers_section', 'items']) as Array<{ workerKey?: string }> | undefined;
    const taken = useMemo(
        () => new Set((selectedKeys || []).map((item) => item?.workerKey).filter(Boolean) as string[]),
        [selectedKeys],
    );

    useEffect(() => {
        let active = true;

        client
            .fetch<WorkerOption[]>(`*[_type == "about-us-design"][0].workers[]{ _key, "title": coalesce(worker.en, worker.am, worker.ru, "Trainer") }`)
            .then((rows) => {
                if (active) setOptions((rows || []).filter((row) => row?._key));
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [client]);

    return (
        <Stack space={3}>
            <Select
                value={currentKey}
                disabled={readOnly || loading}
                onChange={(event) => {
                    const next = event.currentTarget.value;
                    if (!next) {
                        onChange(unset());
                        return;
                    }
                    const option = options.find((item) => item._key === next);
                    onChange(set({
                        ...(typeof value === 'object' && value ? value : {}),
                        workerKey: next,
                        label: option?.title || next,
                    }));
                }}
            >
                <option value="">{loading ? 'Loading trainers…' : 'Select home page trainer…'}</option>
                {options.map((option) => {
                    const usedElsewhere = taken.has(option._key) && option._key !== currentKey;
                    return (
                        <option key={option._key} value={option._key} disabled={usedElsewhere}>
                            {option.title || option._key}{usedElsewhere ? ' (already added)' : ''}
                        </option>
                    );
                })}
            </Select>
            {!loading && !options.length && (
                <Text size={1} muted>
                    No trainers on Home page → Staff yet. Add people there first.
                </Text>
            )}
            {currentKey && (
                <Text size={1} muted>
                    Profile is edited on Home page → Staff.
                </Text>
            )}
        </Stack>
    );
};

export default HomeTrainerInput;
