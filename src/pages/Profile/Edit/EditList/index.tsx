import styles from './index.module.scss'
type Props = {
  closeList: () => void
  type: '' | 'photo' | 'gender'
}
const genderList = [
  { title: '男', value: '0' },
  { title: '女', value: '1' },
]

const photoList = [
  { title: '拍照', value: '' },
  { title: '本地选择', value: '' },
]
const EditList = ({ closeList, type }: Props) => {
  const list = type === 'photo' ? photoList : genderList
  return (
    <div className={styles.root}>
      {list.map((item) => (
        <div className="list-item" key={item.title}>
          {item.title}
        </div>
      ))}

      <div className="list-item" onClick={() => closeList()}>
        取消
      </div>
    </div>
  )
}

export default EditList
