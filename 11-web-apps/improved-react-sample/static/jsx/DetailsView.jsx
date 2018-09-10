class DetailsView extends React.Component {
  constructor(props) {
    super()
    this.props = props
  }
  
  render() {
    return (
      <div>
        <label>ID</label><br/>
        <input type="text" value={this.props.record.id} />
        <br/>
        <label>First Name</label><br/>
        <input type="text" value={this.props.record.firstName} onChange={event => this.props.actions.updateValue('firstName', event)} />
        <br/>
        <label>Last Name</label><br/>
        <input type="text" value={this.props.record.lastName} onChange={event => this.props.actions.updateValue('lastName', event)} /><br/>
        <button onClick={ event => this.props.actions.save(this.props.record) }>Save</button>
        <button onClick={ event => this.props.actions.cancel() }>Cancel</button>
      </div>
    )
  }
}