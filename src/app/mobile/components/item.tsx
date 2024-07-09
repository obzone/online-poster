'use client';

import { ActivityModel } from "@/app/services/calendar";
import moment from "moment";
import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax";
import styles from './item.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

export default function MobileItem(props: ActivityModel) {
  const valueArray = [props.startTime, props.endTime].map((date) => moment.utc(date).local().format('hh:mm A'))
  return (
    <div className={`${styles.itemContainer} box`} >
      <ParallaxBanner style={{ aspectRatio: '1/1' }} >
        <ParallaxBannerLayer speed={-10} expanded={true} >
          <img
            src={props.post || 'https://succi-posts.s3.amazonaws.com/istockphoto-1396814518-612x612.jpg'}
            alt=""
            loading='lazy'
            style={{width: '100%', height: '100%'}}
          />
        </ParallaxBannerLayer>
        <ParallaxBannerLayer >
          <Link href={`../activities/${props.id}`}>
            <div className={styles.captionContainer} >
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '20px' }} >{props.title}</div>
                <div>{props.spot}</div>
                <a href={`/api/ics/${props.id}`} >
                  {moment.utc(props.startTime).local().format('DD/MMM')} {valueArray.join(' ~ ')}
                  {'  '}
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </a>
                <div>{props.subject}</div>
              </div>
            </div>
          </Link>
        </ParallaxBannerLayer>
      </ParallaxBanner>
    </div>
  )
}