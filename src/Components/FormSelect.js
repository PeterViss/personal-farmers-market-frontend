import React, { Component } from 'react'
import { Form, Responsive, Select } from 'semantic-ui-react'
class FormSelect extends Component {
  translateArr = arr => {
    return arr.map((string, i) => {
      return { key: i, text: string, value: string }
    })
  }

  render() {
    let options1 = [
      'NoHair',
      'Hat',
      'Hijab',
      'Turban',
      'WinterHat1',
      'WinterHat2',
      'WinterHat3',
      'WinterHat4',
      'LongHairBigHair',
      'LongHairBob',
      'LongHairBun',
      'LongHairCurly',
      'LongHairCurvy',
      'LongHairDreads',
      'LongHairFro',
      'LongHairFroBand',
      'LongHairNotTooLong',
      'LongHairMiaWallace',
      'LongHairStraight',
      'LongHairStraight2',
      'LongHairStraightStrand',
      'ShortHairDreads01',
      'ShortHairDreads02',
      'ShortHairFrizzle',
      'ShortHairShaggyMullet',
      'ShortHairShortCurly',
      'ShortHairShortFlat',
      'ShortHairShortRound',
      'ShortHairShortWaved',
      'ShortHairSides',
      'ShortHairTheCaesar',
      'ShortHairTheCaesarSidePart'
    ]
    let options2 = [
      'Blank',
      'Kurt',
      'Prescription01',
      'Prescription02',
      'Round',
      'Sunglasses',
      'Wayfarers'
    ]

    let options3 = [
      'Auburn',
      'Black',
      'Blonde',
      'BlondeGolden',
      'Brown',
      'BrownDark',
      'PastelPink',
      'Platinum',
      'Red',
      'SilverGray'
    ]

    let options4 = [
      'Blank',
      'BeardMedium',
      'BeardMajestic',
      'MoustacheFancy',
      'MoustacheMagnum'
    ]

    let options5 = [
      'Auburn',
      'Black',
      'Blonde',
      'BlondeGolden',
      'Brown',
      'BrownDark',
      'Platinum',
      'Red'
    ]

    let options6 = [
      'BlazerShirt',
      'BlazerSweater',
      'CollarSweater',
      'Hoodie',
      'Overall',
      'ShirtCrewNeck',
      'ShirtScoopNeck',
      'ShirtVNeck'
    ]

    let options7 = [
      'Black',
      'Blue02',
      'Blue03',
      'Gray01',
      'Gray02',
      'Heather',
      'PastelBlue',
      'PastelGreen',
      'PastelOrange',
      'PastelRed',
      'PastelYellow',
      'Pink',
      'Red',
      'White'
    ]

    let options8 = [
      'Close',
      'Cry',
      'Default',
      'Dizzy',
      'EyeRoll',
      'Happy',
      'Hearts',
      'Side',
      'Squint',
      'Surprised',
      'Wink',
      'WinkWacky'
    ]

    let options9 = [
      'Angry',
      'AngryNatural',
      'Default',
      'DefaultNatural',
      'FlatNatural',
      'RaisedExcited',
      'RaisedExcitedNatural',
      'SadConcerned',
      'SadConcernedNatural',
      'UnibrowNatural',
      'UpDown',
      'UpDownNatural'
    ]

    let options10 = [
      'Concerned',
      'Default',
      'Disbelief',
      'Eating',
      'Grimace',
      'Sad',
      'ScreamOpen',
      'Serious',
      'Smile',
      'Tongue',
      'Twinkle',
      'Vomit'
    ]

    let options11 = [
      'Tanned',
      'Yellow',
      'Pale',
      'Light',
      'Brown',
      'DarkBrown',
      'Black'
    ]

    let noClothesColor = ['BlazerShirt', 'BlazerSweater']
    let hats = [
      'NoHair',
      'Hat',
      'Hijab',
      'Turban',
      'WinterHat1',
      'WinterHat2',
      'WinterHat3',
      'WinterHat4'
    ]
    let noFacialHairCol = ['Hijab']
    let nohatColor = ['Hat', 'NoHair']
    //debugger

    return (
      <Responsive as={Form} minWidth={90}>
        {this.props.disableForm ? (
          <Form.Button onClick={this.props.disableForm} color="black">
            Nevermind
          </Form.Button>
        ) : null}

        <Responsive
          as={Form.Select}
          minWidth={300}
          label="Hair"
          name="top"
          value={this.props.avatar.top}
          options={this.translateArr(options1)}
          placeholder="Hair"
          onChange={this.props.changeAvatar}
        />
        <Responsive
          as={Form.Select}
          minWidth={300}
          label="Accessories"
          name="accessories"
          value={this.props.avatar.accessories}
          options={this.translateArr(options2)}
          placeholder="Accessories"
          onChange={this.props.changeAvatar}
        />
        {hats.includes(this.props.avatar.top) ? (
          nohatColor.includes(this.props.avatar.top) ? null : (
            <Responsive
              as={Form.Select}
              minWidth={300}
              label="Hat Color"
              name="hat_color"
              value={this.props.avatar.hat_color}
              options={this.translateArr(options7)}
              placeholder="Hat Color"
              onChange={this.props.changeAvatar}
            />
          )
        ) : (
          <Responsive
            as={Form.Select}
            minWidth={300}
            label="Hair Color"
            name="hair_color"
            value={this.props.avatar.hair_color}
            options={this.translateArr(options3)}
            placeholder="Hair Color"
            onChange={this.props.changeAvatar}
          />
        )}
        {noFacialHairCol.includes(this.props.avatar.top) ? null : (
          <Responsive
            as={Form.Select}
            minWidth={300}
            label="Facial Hair"
            name="facial_hair"
            value={this.props.avatar.facial_hair}
            options={this.translateArr(options4)}
            placeholder="Facial Hair"
            onChange={this.props.changeAvatar}
          />
        )}
        {this.props.avatar.facial_hair ===
        'Blank' ? null : noFacialHairCol.includes(
            this.props.avatar.top
          ) ? null : (
          <Responsive
            as={Form.Select}
            minWidth={300}
            label="Facial Hair Color"
            name="facial_hair_color"
            value={this.props.avatar.facial_hair_color}
            options={this.translateArr(options5)}
            placeholder="Facial Color"
            onChange={this.props.changeAvatar}
          />
        )}
        <Responsive
          as={Form.Select}
          minWidth={300}
          label="Clothes"
          name="clothes"
          value={this.props.avatar.clothes}
          options={this.translateArr(options6)}
          placeholder="Clothes"
          onChange={this.props.changeAvatar}
        />
        {noClothesColor.includes(this.props.avatar.clothes) ? null : (
          <Responsive
            as={Form.Select}
            minWidth={300}
            label="Clothes Color"
            name="color_fabric"
            value={this.props.avatar.color_fabric}
            options={this.translateArr(options7)}
            placeholder="Clothes Color"
            onChange={this.props.changeAvatar}
          />
        )}

        <Responsive
          as={Form.Select}
          minWidth={300}
          label="Eyes"
          name="eyes"
          value={this.props.avatar.eyes}
          options={this.translateArr(options8)}
          placeholder="Clothes Color"
          onChange={this.props.changeAvatar}
        />
        <Responsive
          as={Form.Select}
          minWidth={540}
          label="Eyebrows"
          name="eyebrow"
          value={this.props.avatar.eyebrow}
          options={this.translateArr(options9)}
          placeholder="Eyebrows"
          onChange={this.props.changeAvatar}
        />
        <Responsive
          as={Form.Select}
          minWidth={300}
          label="Mouth"
          name="mouth"
          value={this.props.avatar.mouth}
          options={this.translateArr(options10)}
          placeholder="Mouth"
          onChange={this.props.changeAvatar}
        />
        <Responsive
          as={Form.Select}
          minWidth={300}
          label="Skin"
          name="skin"
          value={this.props.avatar.skin}
          options={this.translateArr(options11)}
          placeholder="Skin"
          onChange={this.props.changeAvatar}
        />
        {this.props.submitAvatar ? (
          <Form.Button
            color="teal"
            onClick={() => this.props.submitAvatar(this.props.avatar)}
          >
            Submit
          </Form.Button>
        ) : null}
      </Responsive>
    )
  }
}

export default FormSelect
