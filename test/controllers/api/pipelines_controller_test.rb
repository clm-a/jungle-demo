class Api::PipelinesControllerTest < ActionDispatch::IntegrationTest
  test "Should be able to change application statuses" do
    pipeline = pipelines(:stage_account_manager)

    get api_pipeline_path(pipeline.slug)

    assert_response :success
    response_json = JSON.parse(response.body)
    assert response_json['incoming_applications'].count == 1, "1 incoming application should be present from fixtures by default"
    assert response_json['to_meet_applications'].count == 0, "0 to meet applications should be present from fixtures by default"

    pipeline_application = pipeline.incoming_applications.first
    params = {pipeline: { to_meet_applications_ids: [ pipeline_application.id ]}}

    patch api_pipeline_path(pipeline.slug), params: params

    get api_pipeline_path(pipeline.slug)

    assert_response :success
    response_json = JSON.parse(response.body)
    assert response_json['incoming_applications'].count == 0, "0 incoming application should be present after patching"
    assert response_json['to_meet_applications'].count == 1, "1 to meet applications should be present after patching"

    other_candidate = Candidate.create(display_name: 'Jean-Michel')
    other_candidate.apply_to_pipeline!(pipeline)

    get api_pipeline_path(pipeline.slug)

    assert_response :success
    response_json = JSON.parse(response.body)
    assert response_json['incoming_applications'].count == 1, "1 incoming application should be present after new pipe candidate application"
    assert response_json['to_meet_applications'].count == 1, "1 to meet applications should still be present"

  end
end