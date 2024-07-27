import { useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutscontext';

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/workoutsform';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts');

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Received non-JSON response:', text);
          throw new TypeError('Received non-JSON response');
        }

        const json = await response.json();
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      } catch (error) {
        console.error('Failed to fetch workouts:', error);
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
