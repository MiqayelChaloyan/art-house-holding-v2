'use client'

import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Logo from '@/src/lib/icons/language/Logo';
import Gmail from '@/src/lib/icons/language/Gmail';
import Instagram from '@/src/lib/icons/language/Instagram';
import Facebook from '@/src/lib/icons/language/Facebook';
import Linkedin from '@/src/lib/icons/language/Linkedin';
import X from '@/src/lib/icons/language/X';
import Tiktok from '@/src/lib/icons/language/Tiktok';
import Telegram from '@/src/lib/icons/language/Telegram';
import YouTube from '@/src/lib/icons/language/YouTube';
import Pinterest from '@/src/lib/icons/language/Pinterest';
import WhatsApp from '@/src/lib/icons/language/WhatsApp';
import Viber from '@/src/lib/icons/language/Viber';

import Copyright from '@/src/components/components/copyright';
import { Arial } from '@/src/constants/font';

import useWindowSize from '@/src/hooks/useWindowSize';

import { socialNetwork } from '@/src/types/general';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    socialData: CONTACT_US_LANGUAGE_QUERYResult;
};

const socialNetworkComponents: socialNetwork = {
	facebook: Facebook,
	instagram: Instagram,
	gmail: Gmail,
	linkedin: Linkedin,
	x: X,
	tiktok: Tiktok,
	telegram: Telegram,
	youtube: YouTube,
	pinterest: Pinterest,
	whatsapp: WhatsApp,
	viber: Viber
};

const Footer = ({ socialData }: Readonly<Props>) => {
    const windowSize = useWindowSize();
    const tel = 'tel:' + socialData?.phone_number.replace(/\s/g, '');
    const t = useTranslations('address');

    const hosts = socialData?.social_links.map((host: SOCIAL_LINK) => {
		const socialName = host?.social_name.toLowerCase();
		const link = socialName === 'gmail' ? `mailto:${host?.social_link}` : host?.social_link;
		const SocialIcon = (socialNetworkComponents as any)[socialName];
		if (!SocialIcon) return null;

        return (
            <Link
                key={host._key}
                href={link}
                aria-label={host?.social_name}
                className={styles.social_network}
                target='_blank'
            >
                <SocialIcon
                    width={windowSize.width <= 1024 ? 20 : 30}
                    height={windowSize.width <= 1024 ? 20 : 30}
                    fill={colors.yellow}
                />
            </Link>
        )
    });

    return (
        <footer className={styles.footer}>
            <div className={styles.column}>
                <div className={styles.logo}>
                    <Logo
                        width={windowSize.width > 1280 ? 255.53 : windowSize.width > 1024 ? 200 : 150}
                        height={80}
                        fill={colors.yellow}
                    />
                </div>
                <div>
                    <div className={styles.address}>
                        <span className={Arial.className}>
                            {socialData?.address || t('address')}
                        </span>
                        <Link href={tel} aria-label={socialData?.phone_number} className={styles.icon}>
                            <p className={cn(styles.phone, Arial.className)}>{socialData?.phone_number}</p>
                        </Link>
                    </div>
                    <Copyright className={cn(styles.reserved, Arial.className)} />
                </div>
                <div className={styles.hosts}>
                    {hosts}
                </div>
            </div>
        </footer>
    )
};

export default React.memo(Footer);