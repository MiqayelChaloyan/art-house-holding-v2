import React, { useMemo, useState } from 'react';

import { Stack, Text } from '@sanity/ui';
import { InputProps, MemberField, MemberFieldSet, ObjectInputProps, ObjectMember } from 'sanity';

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
    about: 'The about block.',
    video: 'The course video under the about block.',
    lessons: 'The lesson cards.',
    specialists: 'The teachers and their work.',
    reviews: 'Student ratings.',
    daily: 'Photos and clips from the school day.',
    voices: 'Student quotes. Add 3 to 6.',
    clients: 'The names that scroll above the footer.',
    content: 'The fields for this page.',
    portfolio: 'Portfolio work for this course.',
    orders: 'Orders linked to this course.',
    older: 'Saved from an older layout. Not shown on the page.',
    og: 'The title, text, and image used when the page is shared.',
    manifest: 'Settings for installing the site as an app.',
};

const OTHER_GROUPS = new Set(['og', 'manifest', 'older', 'seo', 'settings']);
const IGNORED_GROUPS = new Set(['all-fields']);
const CONTENT_NAME = '__content__';

type NavGroup = {
    name: string;
    title?: string;
};

const cleanTitle = (title?: string) => (title || 'Section').replace(/^\d+\.\s*/, '');

const memberGroups = (member: ObjectMember) => (
    member.kind === 'error'
        ? []
        : (member.groups || []).filter((name) => !IGNORED_GROUPS.has(name))
);

const isDocumentRoot = (props: InputProps): props is ObjectInputProps => (
    props.schemaType?.jsonType === 'object'
    && Array.isArray((props as ObjectInputProps).groups)
    && (props.path?.length ?? 0) === 0
);

const SectionDocumentInput = (props: ObjectInputProps) => {
    const { groups, members, onFieldGroupSelect, renderField, renderInput, renderItem, renderPreview } = props;
    const [picked, setPicked] = useState<string | null>(null);

    const visibleGroups = groups.filter((group) => !group.disabled && !IGNORED_GROUPS.has(group.name));
    const pageGroups = visibleGroups.filter((group) => !OTHER_GROUPS.has(group.name));
    const otherGroups = visibleGroups.filter((group) => OTHER_GROUPS.has(group.name));
    const hasUngrouped = members.some((member) => member.kind !== 'error' && memberGroups(member).length === 0);
    const contentGroup: NavGroup | null = hasUngrouped ? { name: CONTENT_NAME, title: 'Content' } : null;
    const sections: NavGroup[] = contentGroup ? [contentGroup, ...pageGroups] : pageGroups;

    const active = picked
        || sections[0]?.name
        || otherGroups[0]?.name
        || '';

    const membersFor = useMemo(() => {
        const byGroup = new Map<string, ObjectMember[]>();
        members.forEach((member) => {
            if (member.kind === 'error') return;
            const assigned = memberGroups(member);
            const key = assigned.length === 0 ? CONTENT_NAME : assigned[0];
            const list = byGroup.get(key) || [];
            list.push(member);
            byGroup.set(key, list);
        });
        return byGroup;
    }, [members]);

    const ordered = [
        ...sections.map((group) => ({ group, fields: membersFor.get(group.name) || [] })),
        ...otherGroups.map((group) => ({ group, fields: membersFor.get(group.name) || [] })),
    ].filter((block) => block.fields.length > 0);

    const select = (name: string) => {
        setPicked(name);
        if (name !== CONTENT_NAME) onFieldGroupSelect(name);
        document.getElementById(`studio-section-${name}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const renderNavItem = (group: NavGroup, indexLabel?: string) => {
        const selected = group.name === active;
        const note = NOTES[group.name];
        return (
            <button
                key={group.name}
                type="button"
                className="studio-sections-item"
                aria-pressed={selected}
                onClick={() => select(group.name)}
            >
                {indexLabel && <span className="studio-sections-index">{indexLabel}</span>}
                <span className="studio-sections-copy">
                    <span className="studio-sections-name">{cleanTitle(group.title)}</span>
                    {note && <span className="studio-sections-note">{note}</span>}
                </span>
            </button>
        );
    };

    return (
        <div className="studio-sections">
            <style>{`
                [data-testid="document-panel-scroller"]:has(.studio-sections) {
                    display: flex;
                    flex-direction: column;
                }
                [data-testid="document-panel-scroller"]:has(.studio-sections) > * {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    min-height: 100%;
                }
                [data-ui="Container"]:has(.studio-sections) {
                    max-width: none;
                    width: 100%;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    min-height: 100%;
                }
                .studio-sections {
                    display: grid;
                    grid-template-columns: minmax(228px, 268px) minmax(0, 1fr);
                    gap: 28px;
                    align-items: stretch;
                    flex: 1;
                    min-height: calc(100dvh - 132px);
                }
                .studio-sections-nav {
                    position: sticky;
                    top: 8px;
                    align-self: start;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .studio-sections-label {
                    margin: 0 0 8px;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    opacity: 0.55;
                }
                .studio-sections-list {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .studio-sections-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    width: 100%;
                    margin: 0;
                    padding: 10px 12px;
                    border: 1px solid transparent;
                    border-radius: 12px;
                    background: transparent;
                    color: inherit;
                    text-align: left;
                    cursor: pointer;
                }
                .studio-sections-item:hover {
                    background: rgba(206, 36, 33, 0.08);
                }
                .studio-sections-item[aria-pressed="true"] {
                    background: rgba(206, 36, 33, 0.14);
                    border-color: rgba(206, 36, 33, 0.45);
                }
                .studio-sections-index {
                    flex: none;
                    width: 22px;
                    margin-top: 1px;
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 0.04em;
                    color: #ce2421;
                }
                .studio-sections-copy {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    min-width: 0;
                }
                .studio-sections-name {
                    font-size: 14px;
                    font-weight: 600;
                    line-height: 1.3;
                }
                .studio-sections-note {
                    font-size: 12px;
                    line-height: 1.35;
                    opacity: 0.62;
                }
                .studio-sections-main {
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                    min-height: 100%;
                    padding-bottom: 48px;
                }
                .studio-sections-block {
                    scroll-margin-top: 12px;
                }
                .studio-sections-block:last-child {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                .studio-sections-fields {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                }
                .studio-sections-block:last-child .studio-sections-fields {
                    flex: 1;
                }
                @media (max-width: 900px) {
                    .studio-sections {
                        grid-template-columns: 1fr;
                    }
                    .studio-sections-nav {
                        position: static;
                    }
                    .studio-sections-list {
                        flex-direction: row;
                        overflow-x: auto;
                        padding-bottom: 4px;
                    }
                    .studio-sections-item {
                        min-width: 196px;
                    }
                }
            `}</style>
            <nav className="studio-sections-nav" aria-label="Document sections">
                {sections.length > 0 && (
                    <div>
                        <p className="studio-sections-label">On the page</p>
                        <div className="studio-sections-list">
                            {sections.map((group, index) => renderNavItem(group, String(index + 1).padStart(2, '0')))}
                        </div>
                    </div>
                )}
                {otherGroups.length > 0 && (
                    <div>
                        <p className="studio-sections-label">Other</p>
                        <div className="studio-sections-list">
                            {otherGroups.map((group) => renderNavItem(group))}
                        </div>
                    </div>
                )}
            </nav>
            <div className="studio-sections-main">
                {ordered.map(({ group, fields }) => (
                    <section
                        key={group.name}
                        id={`studio-section-${group.name}`}
                        className="studio-sections-block"
                    >
                        <Stack space={2} paddingBottom={4}>
                            <Text size={3} weight="semibold">{cleanTitle(group.title)}</Text>
                            {NOTES[group.name] && <Text size={1} muted>{NOTES[group.name]}</Text>}
                        </Stack>
                        <div className="studio-sections-fields">
                            {fields.map((member) => {
                                if (member.kind === 'field') {
                                    return (
                                        <MemberField
                                            key={member.key}
                                            member={member}
                                            renderField={renderField}
                                            renderInput={renderInput}
                                            renderItem={renderItem}
                                            renderPreview={renderPreview}
                                        />
                                    );
                                }
                                if (member.kind === 'fieldSet') {
                                    return (
                                        <MemberFieldSet
                                            key={member.key}
                                            member={member}
                                            renderField={renderField}
                                            renderInput={renderInput}
                                            renderItem={renderItem}
                                            renderPreview={renderPreview}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export const StudioFormInput = (props: InputProps) => {
    const isRoot = props.schemaType?.jsonType === 'object' && (props.path?.length ?? 0) === 0;
    if (!isRoot) return props.renderDefault(props);
    if (isDocumentRoot(props)) return <SectionDocumentInput {...props} />;

    return (
        <div className="studio-document-fields">
            <style>{`
                [data-testid="document-panel-scroller"]:has(.studio-document-fields) {
                    display: flex;
                    flex-direction: column;
                }
                [data-testid="document-panel-scroller"]:has(.studio-document-fields) > * {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    min-height: 100%;
                }
                [data-ui="Container"]:has(.studio-document-fields) {
                    max-width: none;
                    width: 100%;
                    flex: 1;
                    min-height: calc(100dvh - 132px);
                }
                .studio-document-fields {
                    min-height: calc(100dvh - 160px);
                }
            `}</style>
            {props.renderDefault(props)}
        </div>
    );
};

export default SectionDocumentInput;
