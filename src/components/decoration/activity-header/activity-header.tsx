import styles from './activity-header.module.scss'

export default function ActivityHeader(props:{month: Date}) {
  const year = props.month.getFullYear()
  const month = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'][props.month.getMonth()]

  return (
    <div className={styles.container} >
      <div>{`${month}/${year}`}</div>
      <div>SUCCI</div>
    </div>
  )
}