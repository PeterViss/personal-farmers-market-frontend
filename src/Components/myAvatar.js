import React from 'react'
import Avatar from 'avataaars'
const MyAvatar = props => {
  //debugger
  return (
    <Avatar
      style={{ width: '200px', height: '200px', backgroundColor: 'lightblue' }}
      avatarStyle={'Transparent'}
      topType={props.avatar ? props.avatar.top : null}
      accessoriesType={props.avatar ? props.avatar.accessories : null}
      hairColor={props.avatar ? props.avatar.hair_color : null}
      hatColor={props.avatar ? props.avatar.hat_color : null}
      facialHairType={props.avatar ? props.avatar.facial_hair : null}
      facialHairColor={props.avatar ? props.avatar.facial_hair_color : null}
      clotheType={props.avatar ? props.avatar.clothes : null}
      clotheColor={props.avatar ? props.avatar.color_fabric : null}
      eyeType={props.avatar ? props.avatar.eyes : null}
      eyebrowType={props.avatar ? props.avatar.eyebrow : null}
      mouthType={props.avatar ? props.avatar.mouth : null}
      skinColor={props.avatar ? props.avatar.skin : null}
    />
  )
}

export default MyAvatar
