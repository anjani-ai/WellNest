
import { useState } from 'react';
import { generateWellnessSnapshot, exportWellnessData, WellnessSnapshot } from '@/services/moodAnalysisApi';
import { useToast } from '@/hooks/use-toast';

export const useWellnessExport = () => {
  const [snapshot, setSnapshot] = useState<WellnessSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generateSnapshot = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const wellnessSnapshot = await generateWellnessSnapshot();
      setSnapshot(wellnessSnapshot);
      console.log('Wellness snapshot generated:', wellnessSnapshot);
      
      toast({
        title: "Wellness Snapshot Generated! 📊",
        description: "Your 30-day mental wellness summary is ready.",
      });
    } catch (err) {
      setError('Failed to generate wellness snapshot');
      console.error('Error generating snapshot:', err);
      
      toast({
        title: "Error",
        description: "Failed to generate your wellness snapshot. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = async () => {
    try {
      setIsLoading(true);
      const exportedData = await exportWellnessData();
      
      // Create downloadable file
      const blob = new Blob([exportedData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `wellnest-snapshot-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Data Exported! 📄",
        description: "Your wellness data has been downloaded. You can share this with healthcare providers.",
      });
      
      console.log('Wellness data exported successfully');
    } catch (err) {
      setError('Failed to export wellness data');
      console.error('Error exporting data:', err);
      
      toast({
        title: "Export Failed",
        description: "Failed to export your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    snapshot,
    isLoading,
    error,
    generateSnapshot,
    exportData
  };
};
