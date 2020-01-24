require 'test_helper'

class PipelineApplicationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "Candidate already applied" do
    pipeline_application = pipeline_applications(:one)
    assert pipeline_application.incoming?, "Pipe application should be incoming by default"
  end
  test "Candidate can apply to other pipeline" do
    pipeline = Pipeline.create!(name: "Other pipeline", slug: "other-pipeline")
    candidate = candidates(:steve)
    assert candidate.pipeline_applications.count == 1, "Should have 1 fixtures default application" # 1 fixtures
    candidate.apply_to_pipeline!(pipeline)
    assert candidate.pipeline_applications.count == 2, "Should now have two pipe applications" # 1 new + 1 fixtures
    candidate.apply_to_pipeline!(pipeline)
    assert candidate.pipeline_applications.count == 2, "Should not be able to reapply to the same pipe"
    assert candidate.errors.details[:pipeline_applications].map(&->(e){e[:error]}).include?(:duplicate), "A nice error should be present"
  end
  test "Count applications by status" do
    pipeline = pipelines(:stage_account_manager)
    assert pipeline.incoming_applications.count == 3, "Should have 3 incoming applications by default"
    assert pipeline.to_meet_applications.count == 0, "Sould have 0 to meet candidates"
    pipeline.incoming_applications.first.to_meet!
    assert pipeline.incoming_applications.count == 2, "Should now have 2 incoming application"
    assert pipeline.to_meet_applications.count == 1, "Sould now have 1 to meet candidates"
  end
end
