'use client'

import Link from 'next/link';

import { TypeAnimation } from 'react-type-animation';

import { TiSocialFacebook } from 'react-icons/ti';
import { BsInstagram } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';

import useWindowSize from '@/src/hooks/useWindowSize';

import Logo from '@/src/lib/icons/art-house/LogoFooter';
import Copyright from '@/src/components/components/copyright';

import { Pages } from '@/src/constants/pages';
import { ArianAMU } from '@/src/constants/font';

import colors from '@/src/themes';

import { socialNetwork } from '@/src/types/coming-soon';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: SOCIAL_QUERYResult;
};

const ComingSoon = ({ data }: Readonly<Props>) => {
    const windowSize = useWindowSize();

    const socialNetworkComponents: socialNetwork = {
        facebook: TiSocialFacebook,
        instagram: BsInstagram,
        gmail: SiGmail,
        linkedin: FaLinkedinIn
    };

    const hosts = data?.social_links.map((host: SOCIAL_LINK) => {
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
                target="_blank"
            >
                <SocialIcon size={windowSize.width <= 1024 ? 17 : 30} />
            </Link>
        )
    });

    return (
        <section className={styles.container}>
            <div className={styles.right_box}>
                <div className={styles.info}>
                    <Link href={Pages.HOME} aria-label='about' className={cn(styles.logo)}>
                        <Logo
                            width={350}
                            height={70}
                            fill={colors.white}
                        />
                    </Link>
                    <h1 className={cn(styles.title, ArianAMU.className)}>Were <span>Launching</span> Soon</h1>
                    <TypeAnimation
                        sequence={[
                            'Were creating something exiting in the house and about to launch soon.',
                            1000,
                            'Stay in the loop and get the latest by following us on social media!',
                            1000,
                            'See you on our socials!',
                            1000
                        ]}
                        wrapper="span"
                        speed={50}
                        className={cn(styles.text, ArianAMU.className)}
                        style={{ display: 'inline-block' }}
                        repeat={Infinity}
                    />
                    <div className={styles.hosts}>
                        {hosts}
                    </div>
                    <Copyright className={cn(styles.reserved, ArianAMU.className)} />
                </div>
            </div>
            <div className={styles.left_box}>
                <div className={styles.settings} />
                <Link href={Pages.HOME} aria-label='about' className={cn(styles.button)}>
                    <p>Go Back</p>
                </Link>
            </div>
        </section>
    )
};

export default ComingSoon;