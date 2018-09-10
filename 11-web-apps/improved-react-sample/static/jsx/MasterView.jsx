class MasterView extends React.Component {
  constructor(props) {
    super()
    this.props = props
  }
  
  render() {
    return (
      <div>
        <table>
          <tr>
            <th>ID</th><th>First name</th><th>Last name</th>
          </tr>
          {
            this.props.records.map(record => {
              return (
                <tr>
                  <td>{record.id}</td><td>{record.firstName}</td><td>{record.lastName}</td>
                  <td><button onClick={() => this.props.actions.edit(record)}>Edit</button></td>
                  <td><button onClick={() => this.props.actions.delete(record)}>Delete</button></td>
                </tr>
              )
            })
          }
        </table>
        <button onClick={() => this.props.actions.create()}>New</button>
      </div>
    )
  }
}