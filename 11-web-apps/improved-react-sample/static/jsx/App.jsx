class App extends React.Component {
  constructor() {
    super()
    
    this.idSequence = 0
    this.state = {
      records: [
        { id: this.nextId(), firstName: 'Ivan', lastName: 'Ivanov' },
        { id: this.nextId(), firstName: 'Georgi', lastName: 'Georgiev' }
      ],
      showDetails: false,
      currentRecord: {}
    }
    
    this.actions = {
      master: {
        create: this.create.bind(this),
        edit: this.edit.bind(this),
        delete: this.delete.bind(this)
      },
      details: {
        updateValue: this.updateValue.bind(this),
        save: this.save.bind(this),
        cancel: this.cancel.bind(this)
      }
    };
  }
  
  nextId() {
    return ++this.idSequence
  }
  
  create() {
    let record = this.cleanRecord()
    record.id = this.nextId()
    this.setState({ currentRecord: record, showDetails: true })
  }
  
  edit(record) {
    let copy = Object.assign({}, record)
    this.setState({ currentRecord: copy, showDetails: true })
  }
  
  delete(record) {
    let records = this.removeFromRecords(this.state.records, record)
    this.setState({ records: records })
  }

  updateValue(property, event) {
    let record = this.state.currentRecord
    record[property] = event.target.value
    this.setState({ currentRecord: record })
  }
  
  save(record) {
    // If we are editing,
    // then we need to replace the previous entry with the new one.
    // If we are not - remove will do nothing
    let records = this.removeFromRecords(this.state.records, record)
    records.push(record)
    this.setState({ records: records })
	this.cancel()
  }
  
  cancel() {
    this.setState({ currentRecord: this.cleanRecord(), showDetails: false })
  }
  
  cleanRecord() {
    return {id: '', firstName: '', lastName: ''}
  }
  
  removeFromRecords(records, record) {
	return this.state.records.filter(currentRecord => currentRecord.id !== record.id)
  }
  
  render() {
    return (
      <div>
        <MasterView records={this.state.records} actions={this.actions.master} />
        {this.state.showDetails && <DetailsView record={this.state.currentRecord} actions={this.actions.details} /> }
      </div>
    )
  }
}