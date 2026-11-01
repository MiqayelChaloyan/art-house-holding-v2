import React, { Component, ReactNode, useState } from 'react';

import { InputProps, MemberField, ObjectInputProps, ObjectMember } from 'sanity';

const ALL_FIELDS = 'all-fields';
const IGNORED_GROUPS = new Set([ALL_FIELDS]);
const OTHER_GROUPS = new Set(['og', 'manifest', 'older', 'seo', 'settings']);

const NOTES: Record<string, string> = {
    banner: 'The full-width slides at the top.',
    studio: 'The title, the three numbers, and the photos.',
    courses: 'The heading and up to 10 course cards.',
    reasons: 'The grid after the courses. Up to 30 reasons.',
    staff: 'The heading and the people in the slider.',
    certificates: 'The title and up to 10 pictures.',
    projects: 'Up to 10 projects. The first is the large card.',
    blog: 'The title above the news. Posts are edited separately.',
    websites: 'The site cards on the holding home page.',
    numbers: 'The counters on the home page.',
    about: 'The story and the portrait.',
    ratings: 'Reviews on the about page.',
    contact: 'Address, hours, and phone numbers.',
    social: 'Social links shown in the footer.',
    video: 'The course video under the about block.',
    lessons: 'The lesson cards.',
    specialists: 'The teachers and their work.',
    reviews: 'Student ratings.',
    daily: 'Photos and clips from the school day.',
    voices: 'Student quotes. Add 3 to 6.',
    clients: 'The names that scroll above the footer.',
    content: 'The main fields for this page.',
    portfolio: 'Portfolio work for this course.',
    orders: 'Orders linked to this course.',
    older: 'Saved from an older layout. Not shown on the page.',
    og: 'The title, text, and image used when the page is shared.',
    manifest: 'Settings for installing the site as an app.',
    eyebrow: 'Short label above the title.',
    line_1: 'First line of the page title.',
    line_2: 'Second line of the page title.',
    intro: 'The short text under the title.',
    image: 'The portrait on the page.',
    sections: 'The story blocks under the portrait.',
};

type NavGroup = {
    name: string;
    title?: string;
};

type SchemaField = {
    name: string;
    title?: string;
    fieldset?: string;
    group?: string | string[];
};

type SchemaFieldset = {
    name: string;
    title?: string;
};

type SchemaGroup = {
    name: string;
    title?: string;
};

const labelOf = (item: { name: string; title?: string }) => (
    (item.title || item.name || 'Section').replace(/^\d+\.\s*/, '')
);

const schemaGroups = (props: InputProps): SchemaGroup[] => {
    const groups = (props.schemaType as { groups?: SchemaGroup[] } | undefined)?.groups;
    return (Array.isArray(groups) ? groups : []).filter((group) => !IGNORED_GROUPS.has(group.name));
};

const schemaFieldsets = (props: InputProps): SchemaFieldset[] => {
    const fieldsets = (props.schemaType as { fieldsets?: SchemaFieldset[] } | undefined)?.fieldsets;
    return Array.isArray(fieldsets) ? fieldsets : [];
};

const schemaFields = (props: InputProps): SchemaField[] => {
    const fields = (props.schemaType as { fields?: SchemaField[] } | undefined)?.fields;
    return Array.isArray(fields) ? fields : [];
};

const isDocumentRoot = (props: InputProps): props is ObjectInputProps => (
    props.schemaType?.jsonType === 'object'
    && (props.path?.length ?? 0) === 0
    && (
        schemaGroups(props).length > 0
        || schemaFieldsets(props).length > 0
        || schemaFields(props).length > 1
    )
);

const memberHasGroup = (member: ObjectMember, name: string) => (
    member.kind !== 'error' && (member.groups || []).includes(name)
);

const renderMembers = (
    members: ObjectMember[],
    props: Pick<ObjectInputProps, 'renderField' | 'renderInput' | 'renderItem' | 'renderPreview'>,
) => (
    members.flatMap((member) => {
        const items = member.kind === 'fieldSet' ? member.fieldSet.members : [member];
        return items.map((item) => {
            if (item.kind !== 'field') return null;
            return (
                <MemberField
                    key={item.key}
                    member={item}
                    renderField={props.renderField}
                    renderInput={props.renderInput}
                    renderItem={props.renderItem}
                    renderPreview={props.renderPreview}
                />
            );
        });
    })
);

const SectionNav = ({
    page,
    other,
    active,
    onSelect,
}: {
    page: NavGroup[];
    other: NavGroup[];
    active: string;
    onSelect: (name: string) => void;
}) => {
    const item = (group: NavGroup, indexLabel?: string) => (
        <button
            key={group.name}
            type="button"
            className="studio-sections-item"
            aria-pressed={group.name === active}
            onClick={() => onSelect(group.name)}
        >
            {indexLabel && <span className="studio-sections-index">{indexLabel}</span>}
            <span className="studio-sections-copy">
                <span className="studio-sections-name">{labelOf(group)}</span>
                {NOTES[group.name] && <span className="studio-sections-note">{NOTES[group.name]}</span>}
            </span>
        </button>
    );

    return (
        <nav className="studio-sections-nav" aria-label="Page sections">
            {page.length > 0 && (
                <div>
                    <p className="studio-sections-label">On the page</p>
                    <div className="studio-sections-list">
                        {page.map((group, index) => item(group, String(index + 1).padStart(2, '0')))}
                    </div>
                </div>
            )}
            {other.length > 0 && (
                <div>
                    <p className="studio-sections-label">Other</p>
                    <div className="studio-sections-list">
                        {other.map((group) => item(group))}
                    </div>
                </div>
            )}
        </nav>
    );
};

const SectionFrame = ({
    group,
    children,
}: {
    group: NavGroup;
    children: ReactNode;
}) => (
    <section className="studio-sections-block">
        <div className="studio-sections-head">
            <h2 className="studio-sections-title">{labelOf(group)}</h2>
            {NOTES[group.name] && <p className="studio-sections-lead">{NOTES[group.name]}</p>}
        </div>
        <div className="studio-sections-fields">{children}</div>
    </section>
);

const GroupDocumentInput = (props: ObjectInputProps) => {
    const { groups, members, onFieldGroupSelect } = props;
    const defined = schemaGroups(props);
    const visible = groups
        .filter((group) => !group.disabled && !IGNORED_GROUPS.has(group.name))
        .map((group) => ({
            ...group,
            title: group.title || defined.find((item) => item.name === group.name)?.title || group.name,
        }));
    const page = visible.filter((group) => !OTHER_GROUPS.has(group.name));
    const other = visible.filter((group) => OTHER_GROUPS.has(group.name));
    const [picked, setPicked] = useState('');
    const active = picked
        || visible.find((group) => group.selected)?.name
        || page[0]?.name
        || other[0]?.name
        || '';
    const current = visible.find((group) => group.name === active) || visible[0];
    const currentMembers = members.filter((member) => memberHasGroup(member, active));

    return (
        <div className="studio-sections">
            <SectionNav
                page={page}
                other={other}
                active={active}
                onSelect={(name) => {
                    setPicked(name);
                    onFieldGroupSelect(name);
                }}
            />
            <div className="studio-sections-main">
                {current && (
                    <SectionFrame group={current}>
                        {renderMembers(currentMembers.length > 0 ? currentMembers : members, props)}
                    </SectionFrame>
                )}
            </div>
        </div>
    );
};

const FieldsetDocumentInput = (props: ObjectInputProps) => {
    const fieldsets = schemaFieldsets(props);
    const fieldsetByField = new Map(
        schemaFields(props)
            .filter((field) => field.fieldset)
            .map((field) => [field.name, field.fieldset as string]),
    );
    const [picked, setPicked] = useState(fieldsets[0]?.name || '');
    const current = fieldsets.find((fieldset) => fieldset.name === picked) || fieldsets[0];
    const page = fieldsets.filter((fieldset) => !OTHER_GROUPS.has(fieldset.name));
    const other = fieldsets.filter((fieldset) => OTHER_GROUPS.has(fieldset.name));
    const currentMembers = props.members.filter((member) => {
        if (member.kind === 'fieldSet') return member.fieldSet.name === current?.name;
        if (member.kind === 'field') return fieldsetByField.get(member.name) === current?.name;
        return false;
    });

    return (
        <div className="studio-sections">
            <SectionNav page={page} other={other} active={current?.name || ''} onSelect={setPicked} />
            <div className="studio-sections-main">
                {current && (
                    <SectionFrame group={current}>
                        {renderMembers(currentMembers, props)}
                    </SectionFrame>
                )}
            </div>
        </div>
    );
};

const FieldDocumentInput = (props: ObjectInputProps) => {
    const fields = schemaFields(props);
    const [picked, setPicked] = useState(fields[0]?.name || '');
    const current = fields.find((field) => field.name === picked) || fields[0];
    const currentMembers = props.members.filter((member) => (
        member.kind === 'field' && member.name === current?.name
    ));

    return (
        <div className="studio-sections">
            <SectionNav
                page={fields}
                other={[]}
                active={current?.name || ''}
                onSelect={setPicked}
            />
            <div className="studio-sections-main">
                {current && (
                    <SectionFrame group={current}>
                        {renderMembers(currentMembers, props)}
                    </SectionFrame>
                )}
            </div>
        </div>
    );
};

const SectionDocumentInput = (props: ObjectInputProps) => {
    if (schemaGroups(props).length > 0) {
        return <GroupDocumentInput {...props} />;
    }

    if (schemaFieldsets(props).length > 0) {
        return <FieldsetDocumentInput {...props} />;
    }

    return <FieldDocumentInput {...props} />;
};

class FormFallback extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
    state = { failed: false };

    static getDerivedStateFromError() {
        return { failed: true };
    }

    render() {
        return this.state.failed ? this.props.fallback : this.props.children;
    }
}

export const StudioFormInput = (props: InputProps) => {
    if (!isDocumentRoot(props)) {
        return props.renderDefault(props);
    }

    return (
        <FormFallback fallback={props.renderDefault(props)}>
            <SectionDocumentInput {...props} />
        </FormFallback>
    );
};

export default SectionDocumentInput;
