import React from 'react';
import _ from 'lodash';

export class NodeWidget extends React.Component {
  shouldComponentUpdate() {
    return this.props.diagramEngine.canEntityRepaint(this.props.node);
  }

  render() {
    const { node, children, diagramEngine } = this.props;
    const width = this.props.node.width || 0;
    const height = this.props.node.height || 0;
    const props = {
      'data-nodeid': node.id,
      className: `node${(this.props.node.isSelected() ? ' selected' : '')}`,
      style:{
        top: this.props.node.y - width/2,
        left: this.props.node.x - height/2,
        width: width,
        height: height
      }
    };
    
    // Pass the diagramEngine to the node
    const items = _.isArray(children) ?
      children.map(child => (React.cloneElement(child, { diagramEngine }))) :
      React.cloneElement(children, { diagramEngine });

    return (
      <div {...props}>
        {items}
      </div>
    );
  }
}
