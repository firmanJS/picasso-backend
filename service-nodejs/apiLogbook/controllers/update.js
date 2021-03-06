const { errors, APIError } = require('../utils/exceptions')
const { onUpdated } = require('../utils/session')
// Import Model
const LogBook = require('../models/LogBook')

module.exports = async (req, res) => { // eslint-disable-line
    try {
        const session = req.user
        const { _id } = req.params
        if (!_id) throw new APIError(errors.notFound)

        const {
            dateTask = null,
            projectId = null,
            projectName = null,
            nameTask = null,
            startTimeTask = null,
            endTimeTask = null,
            urgencyTask = null,
            difficultyTask = null,
            evidenceTask = null,
            documentTask = null,
            organizerTask = null,
            otherInformation = null
        } = req.body

        const data = {
          dateTask,
          projectId,
          projectName,
          nameTask,
          startTimeTask,
          endTimeTask,
          urgencyTask,
          difficultyTask,
          evidenceTask,
          documentTask,
          organizerTask,
          otherInformation,
            ...onUpdated(session)
        }

        const results = await LogBook.findByIdAndUpdate(_id, data)

        await res.status(201).send({
            message: 'Update data successfull',
            data: data,
        })

    } catch (error) {
      const { code, message, data } = error

      if (code && message) {
          res.status(code).send({
              code,
              message,
              data,
          })
      } else {
          res.status(500).send(errors.serverError)
      }
    }
}
