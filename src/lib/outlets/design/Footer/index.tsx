'use client'

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { FaFacebookF, FaTwitter, FaPinterestP, FaTiktok } from 'react-icons/fa';
import { FaInstagram, FaViber } from 'react-icons/fa6';
import { IoMailSharp } from 'react-icons/io5';
import { GrLinkedinOption } from 'react-icons/gr';
import { PiTelegramLogoLight, PiWhatsappLogo } from 'react-icons/pi';
import { AiOutlineYoutube } from 'react-icons/ai';

import NextImage from '@/src/components/components/image';
import Container from '@/src/components/components/container';
import Copyright from '@/src/components/components/copyright';

import { Arial, ArianAMU } from '@/src/constants/font';
import { ImagePaths } from '@/src/constants';

import useWindowSize from '@/src/hooks/useWindowSize';

import { socialNetwork } from '@/src/types/design';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    socialData: CONTACT_US_DESIGN_QUERYResult;
};

const socialNetworkComponents: socialNetwork = {
    facebook: FaFacebookF,
    x: FaTwitter,
    instagram: FaInstagram,
    gmail: IoMailSharp,
    linkedin: GrLinkedinOption,
    pinterest: FaPinterestP,
    telegram: PiTelegramLogoLight,
    tiktok: FaTiktok,
    viber: FaViber,
    whatsapp: PiWhatsappLogo,
    youtube: AiOutlineYoutube,
};

const Footer = ({ socialData }: Readonly<Props>) => {
    const windowSize = useWindowSize();
    const t = useTranslations('address');

    const phoneNumbers = socialData?.phone_numbers.map((number: string, index: number) => {
        const phoneNumber = index < socialData.phone_numbers.length - 1 ? `${number}, ` : `${number}`;
        const tel = 'tel:' + number.replace(/\s/g, '');

        return (
            <Link key={number} href={tel} aria-label={number} className={styles.icon}>
                <p className={cn(styles.info_web, ArianAMU.className)}>
                    {phoneNumber}
                </p>
            </Link>
        )
    });

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
                    size={windowSize.width <= 1024 ? 15 : 30}
                    fill={colors.yellow}
                />
            </Link>
        )
    });

    return (
        <footer className={styles.footer}>
            <Container className='container'>
                <div className={styles.column}>
                    <div className={styles.logo}>
                        <NextImage
                            src={ImagePaths.DESIGN.logoURL}
                            alt='logo'
                            className={styles.image}
                            width={500}
                            height={500}
                        />
                    </div>
                    <div>
                        <div className={styles.address}>
                            <span className={Arial.className}>{socialData?.address || t('address')}</span>
                            <div className={styles.phone_numbers}>
                                {phoneNumbers}
                            </div>
                            <Link href={`mailto:${socialData?.email}`} aria-label='Email'>
                                <p className={styles.info_web}>
                                    {socialData?.email}
                                </p>
                            </Link>
                        </div>
                        <Copyright className={cn(styles.reserved, Arial.className)} />
                    </div>
                    <div className={styles.hosts}>
                        {hosts}
                    </div>
                </div>
            </Container>
        </footer>
    )
};

export default Footer;