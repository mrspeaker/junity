import React from "react";
import Input from "./Input";
import ImagePicker from "./ImagePicker";

const {
  Component
} = React;

class EntityComponent extends Component {

  constructor () {
    super();

    this.state = {
      showImagePicker: false,
      imagePickerCallback: null
    };
    this.onClick = this.onClick.bind(this);
    this.onChooseImage = this.onChooseImage.bind(this);
  }

  onClick () {}

  toggleImageDialog (cb) {
    const show = !this.state.showImagePicker
    this.setState({
      showImagePicker: show,
      imagePickerCallback: show ? cb : null
    });
  }

  onChooseImage (e, field) {
    const img = e.target.getAttribute("data-img");
    if (img) {
      this.state.imagePickerCallback(img);
    }
    this.toggleImageDialog(null);
  }

  render () {
    const {component} = this.props;
    const {propTypes, deps} = component.constructor;
    const {showImagePicker} = this.state;

    let propertiesDef = [];
    if (propTypes) {
      for (let v in propTypes) {
        propertiesDef.push([v, propTypes[v]]);
      }
    }

    const makeInput = (field, type, val) => {
      switch (type) {
      case "Boolean":
        return <input type="checkbox" checked={val} onChange={() => component[field] = !component[field]} />
        break;
      case "Instance":
        return <Input value={val.name} onChange={v => {}} />
      case "Image":
        return <span>
          <button onClick={() => this.toggleImageDialog((img) => component[field] = img)}>select</button>
          <Input value={val} onChange={v => {}} />
        </span>
      default:
        return <Input value={val} onChange={v => {
          const newVal = type === "Number" ? parseFloat(v, 10) :  v;
          component[field] = newVal;
          // component.update(1000/60);// TODO: update in EDIT mode
        }} />
      }
    }

    const hasEnabled = propertiesDef.find(p => p[0] === "enabled");
    let enabledBox = null;
    if (hasEnabled) {
      enabledBox = makeInput(hasEnabled[0], hasEnabled[1], component[hasEnabled[0]]);
      propertiesDef = propertiesDef.filter(p => p !== hasEnabled);
    }

    const properties = propertiesDef.map((d, i) => {
      return <div key={i}>{d[0]}: {makeInput(d[0], d[1], component[d[0]])}</div>;
    })

    return <div className="entityComponent" onClick={this.onClick}>
      <strong>{enabledBox}{component.name}</strong>
      <div style={{paddingLeft:"5px"}}>
        {properties}
      </div>
      {showImagePicker && <ImagePicker onChoose={this.onChooseImage} />}
    </div>;
  }
}

export default EntityComponent;
