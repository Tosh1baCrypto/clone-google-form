import { useParams, useNavigate } from 'react-router-dom';
import { useGetFormQuery, useGetResponsesQuery } from '../generated/graphql';
import { 
  Paper, 
  CircularProgress, 
  IconButton, 
  Divider,
  Typography,
  Box 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FormResponses = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: formData, isLoading: isFormLoading } = useGetFormQuery({ id: id || '' });
  const { data: responsesData, isLoading: isResponsesLoading } = useGetResponsesQuery({ formId: id || '' });

  const isLoading = isFormLoading || isResponsesLoading;

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress sx={{ color: '#4b5563' }} />
    </Box>
  );

  const form = formData?.form;

  if (!form) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h5">Form not found</Typography>
        <IconButton onClick={() => navigate('/')}><ArrowBackIcon /> Back to home</IconButton>
      </Box>
    );
  }

  const responses = responsesData?.responses || [];

  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <div className="flex items-center gap-4 mb-6">
          <div>
            <Typography variant="h4" className="font-bold text-gray-800">
              Responses
            </Typography>
            <Typography variant="subtitle1" className="text-gray-500">
              {form.title} — {responses.length} responses total
            </Typography>
          </div>
        </div>

        {responses.length > 0 ? (
          responses.map((resp, index) => (
            <Paper key={resp.id} className="p-6 mb-6 shadow-sm border border-gray-200 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="text-gray-400 text-sm uppercase tracking-wider font-bold">
                  Response #{index + 1}
                </Typography>
                <Typography variant="caption" className="text-gray-400">
                  ID: {resp.id.slice(0, 8)}...
                </Typography>
              </div>
              
              <Divider className="mb-4" />

              <div className="space-y-6">
                {resp.answers.map((ans) => {
                  const question = form.questions.find(q => q.id === ans.questionId);
                  
                  return (
                    <div key={ans.questionId} className="group">
                      <Typography className="text-sm font-semibold text-gray-600 mb-1">
                        {question?.title || "Deleted Question"}
                      </Typography>
                      <div className="p-3 bg-white rounded-lg border border-transparent group-hover:border-gray-200 transition-colors">
                        <Typography className="text-gray-800 italic">
                          {ans.value || <span className="text-gray-300">No answer provided</span>}
                        </Typography>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Paper>
          ))
        ) : (
          <Paper className="p-20 text-center shadow-none border-2 border-dashed border-gray-200 rounded-2xl">
            <Typography className="text-gray-400">
              No one has filled out this form yet. 
              <br /> 
              Share the link to start collecting data!
            </Typography>
          </Paper>
        )}
      </div>
    </div>
  );
};

export default FormResponses;