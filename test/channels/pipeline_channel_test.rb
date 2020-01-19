require "test_helper"

class PipelineChannelTest < ActionCable::Channel::TestCase
  # test "subscribes" do
  #   subscribe
  #   assert subscription.confirmed?
  # end
  test "Pipelines updates" do
    pipeline = pipelines(:stage_account_manager)
    subscribe id: pipeline.slug
    assert subscription.confirmed?

    assert (subscription.connection.transmissions.any? do |transmission|
      # Heads up, hash keys order on the equality right hand is deterministic (because of the json conversion)
      # TODO: improve this test case
      transmission[:message].to_json == { message: 'update', pipeline: pipeline.as_api_json}.to_json
    end), "Should transmit fire update and pipeline data to subscriber"

    # test fire sync to connected clients when an element has changed in the pipeline
    assert_broadcast_on(pipeline, message: "update", pipeline: pipeline.as_api_json) do
      pipeline.update(incoming_applications_ids: [])
    end

  end
end
