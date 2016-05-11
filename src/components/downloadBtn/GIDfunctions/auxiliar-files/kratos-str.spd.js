/* eslint-disable */

export default `<?xml version='1.0' encoding='utf-8'?>
<Kratos_Data version="1.2.38">
    <Groups modeltype="GiD">
    {{GroupsContent}}</Groups>
    <!-- Kratos general application data -->
    <!-- id= Internal identifier -->
    <!-- pid= Public/User identifier -->
    <!-- icon= Icon identifer -->
    <!-- state= Current state ["normal"|"disabled"|"hidden"|"hiddenAll] -->
    <!-- help= Help text for this item -->
    <!-- dv= Default/current value -->
    <!-- ivalues= Available idValues list => Using ComboBox widget-->
    <!-- values= Available traduction values list => Using ComboBox widget-->
    <!-- Kratos application data containers -->
    <RootData id="GeneralApplicationData" pid="General application data" help="General application data" open="1" state="hidden">
        <Container id="ProjectInfo" pid="Project information" state="hiddenAll" class="Tab" help="Project information" open="0" icon="ProjectInfo.gif">
            <Item id="CompanyName" pid="Company name" dv="" style="" help="Company name"/>
            <Item id="ProjectName" pid="Project name" dv="" style="" help="Project name"/>
            <Item id="ProjectNumber" pid="Project number" style="" dv="" help="Project number"/>
            <Item id="ModelName" pid="Model name" dv="" style="" help="Model name"/>
            <Item id="ModelDescription" pid="Model description" dv="" help="Model description"/>
            <Item id="RevisionNumber" pid="Revision number" dv="" help="Revision number"/>
            <Item id="Engineer" pid="Engineer" dv="" help="Engineer"/>
            <Item id="Supervisor" pid="Supervisor" dv="" help="Supervisor"/>
        </Container>
        <Container id="ProjectConfiguration" pid="Project configuration" state="hidden" help="Project configuration" open="0">
            <Item id="KratosPath" pid="Kratos path" dv="D:\Kratos" state="hidden" help="Kratos path"/>
        </Container>
        <Container id="Domain" pid="Domain" help="Helptext" open="1" state="hidden">
            <Item id="SpatialDimension" pid="Spatial dimension" class="nDim" dv="3D" ivalues="2D,3D" values="2D,3D" help="Spatial Dimension" state="hidden"/>
            <Item id="Axisymmetric" pid="Axi-Symmetric" nDim="2D" class="axiSym" dv="No" ivalues="Yes,No" values="Yes,No" help="Axisymmetric Problem" state="normal"/>
        </Container>
        <Container id="ApplicationTypes" pid="Application types" icon="aplicationTree.gif" help="Application types" open="1" state="hiddenAll">
            <Item id="StructuralAnalysis" pid="Structural analysis" class="application" state="normal" dv="Yes" ivalues="Yes,No" values="Yes,No" help="Structural analysis" icon="aplicationTree.gif" open="0"/>
            <Item id="Fluid" pid="Fluid" class="application" dv="No" ivalues="Yes,No" values="Yes,No" help="Fluid dynamics" icon="aplicationTree.gif"/>
            <Item id="PFEM" pid="PFEM" class="application" dv="No" state="hidden" ivalues="Yes,No" values="Yes,No" help="PFEM" icon="aplicationTree.gif"/>
            <Item id="FluidStructureInteraction" pid="Fluid structure interaction (FSI)" class="application" state="hidden" dv="No" ivalues="Yes,No" values="Yes,No" help="Fluid structure interaction (FSI)" icon="aplicationTree.gif"/>
            <Item id="ConvectionDiffusion" pid="Convection diffusion" class="application" state="normal" dv="No" ivalues="Yes,No" values="Yes,No" help="Convection diffusion" icon="aplicationTree.gif"/>
            <Item id="DEM" pid="DEM" class="application" dv="No" state="hidden" ivalues="Yes,No" values="Yes,No" help="DEM" icon="aplicationTree.gif"/>
            <Item id="FreeSurfaceFlow" pid="Free surface flow" class="application" dv="No" state="normal" ivalues="Yes,No" values="Yes,No" help="Free surface flow application" icon="aplicationTree.gif"/>
        </Container>
    </RootData>
    <RootData id="StructuralAnalysis" pid="Structural simulation" state="normal" class="application" icon="aplicationTree.gif" help="Structural simulation" open="1">
        <Container id="AnalysisData" pid="Analysis type" class="Tab" help="Analysis Data" open="0">
            <Item id="StructuralType" pid="Structural type" state="hidden" class="strucType" dv="Shell" GCV="ElemType" help="Structural Element type"/>
            <Item id="KinematicType" pid="Kinematic type" state="normal" class="kinemType" dv="SmallDisplacements" ivalues="SmallDisplacements,LargeDisplacements" values="SmallDisplacements,LargeDisplacements" help="Kinematic Element type"/>
            <Item id="SolutionType" pid="Solution type" class="soluType" dv="Static" ivalues="Static,Dynamic,Quasi-Static,Pseudo-Dynamic" values="Static,Dynamic,Quasi-Static,Pseudo-Dynamic" help="Solution type"/>
            <Item id="TimeIntegrationMethod" pid="Time integration method" soluType="Dynamic" class="timeIntMeth" dv="Implicit" ivalues="Implicit,Explicit" values="Implicit,Explicit" help="Time Integration Methods"/>
            <Item id="AnalysisType" pid="Analysis type" class="analysType" dv="Linear" ivalues="Linear,Non-Linear" values="Linear,Non-Linear" help="Analysis Type"/>
        </Container>
        <Container id="SolutionStrategy" pid="Solution strategy" help="Solution Strategy" open="0" icon="solstrategy.gif">
            <Container id="ParallelType" pid="Parallel type" class="Tab" open="0" icon="groupsTreeNew.gif">
                <Item id="ParallelSolutionType" pid="Parallel type" dv="OpenMP" class="PSolutionType" ivalues="OpenMP,MPI" values="OpenMP,MPI" help=""/>
                <Item id="MPINumberOfProcessors" pid="Number of processors" dv="2" PSolutionType="MPI" help="Number of processors"/>
                <Item id="OpenMPNumberOfThreads" pid="Number of threads" dv="2" PSolutionType="OpenMP" help="Number of threads"/>
            </Container>
            <Container id="LinearSolver" pid="Linear solver" class="Tab" open="0" icon="groupsTreeNew.gif">
                <Item id="LinearSolverType" pid="Linear solver type" class="solverType" dv="Direct" ivalues="Direct,Iterative" values="Direct,Iterative" help=""/>
                <Item id="DirectSolverType" pid="Direct solver type" solverType="Direct" dv="SuperLU" ivalues="SkylineLUFactorization,SuperLU" values="SkylineLUFactorization,SuperLU" delvalues="PastixDirect" help=""/>
                <Item id="IterativeSolverType" pid="Iterative solver type" solverType="Iterative" dv="ConjugateGradient" ivalues="ConjugateGradient,DeflatedCG,SuperLUIterative,GMRES,BCGS" values="ConjugateGradient,DeflatedCG,SuperLUIterative,GMRES,BCGS" delvalues="Pastix,AMGCL" help=""/>
                <Item id="Tolerance" pid="Solver tolerance" solverType="Iterative" dv="1E-5" help=""/>
                <Item id="MaximumIteration" pid="Solver maximum iteration" solverType="Iterative" dv="5000" help=""/>
                <Item id="PreconditionerType" pid="Preconditioner type" state="hidden" solverType="Iterative" dv="ILU0" ivalues="None,Diagonal,ILU0" values="None,Diagonal,ILU0" help=""/>
            </Container>
            <Container id="Dynamic" pid="Time parameters" class="Tab" soluType="Dynamic,Quasi-Static,Pseudo-Dynamic" open="0" icon="groupsTreeNew.gif">
                <Item id="StartTime" pid="Start time" state="hidden" dv="0.01" help=""/>
                <Item id="DeltaTime" pid="Time step" dv="0.01" help=""/>
                <Item id="EndTime" pid="Total time" dv="1" help=""/>
                <Item id="TimeStepPredictionLevel" pid="Time step prediction level" timeIntMeth="Explicit" dv="0" ivalues="0,1,2" values="0,1,2" help="0: No predction; 1: Preditcion at first time step; 2: Prediction every time step"/>
                <Item id="NumberOfSteps" pid="Number of Steps" state="hidden" dv="1" help=""/>
            </Container>
            <Container id="Non-Linear" pid="Non-Linear" class="Tab" analysType="Non-Linear" help="" open="0" icon="nonlinear.gif">
                <Item id="SolutionMethod" pid="Solution method" dv="Newton-Raphson" ivalues="Newton-Raphson" values="Newton-Raphson" delvalues="LineSearch,ArcLength" help=""/>
                <Item id="ConvergenceCriteria" pid="Convergence criteria" class="convCriteria" dv="Residual" ivalues="Residual,Displacement,DisplacementAndResidual" values="Residual,Displacement,DisplacementAndResidual" delvalues="DisplacementOrResidual" help=""/>
                <Item id="ResidualConvergenceTolerance" pid="Residual convergence tolerance" convCriteria="Residual,DisplacementAndResidual,DisplacementOrResidual" dv="1.0E-3" help="Residual convergence tolerance"/>
                <Item id="ResidualAbsoluteTolerance" pid="Residual absolute tolerance" convCriteria="Residual,DisplacementAndResidual,DisplacementOrResidual" dv="1.0E-6" help="Residual absolute tolerance"/>
                <Item id="DisplacementConvergenceTolerance" pid="Displacement convergence tolerance" convCriteria="Displacement,DisplacementAndResidual,DisplacementOrResidual" dv="1.0E-6" help="Displacement convergence tolerance"/>
                <Item id="DisplacementAbsoluteTolerance" pid="Displacement absolute tolerance" convCriteria="Displacement,DisplacementAndResidual,DisplacementOrResidual" dv="1.0E-9" help="Displacement absolute tolerance"/>
                <Item id="MaximumIterations" pid="Maximum iterations" dv="30" help="Newton-Raphson iterations stop when the maximum is reached"/>
            </Container>
        </Container>
        <Container id="Properties" pid="Properties" class="Properties" idTemplate="PropertiesStruct" icon="propsTreeNew.gif" help="Add a new Property" open="0"/>
        <Container id="Elements" pid="Elements" help="Elements" open="0" icon="femelements.gif">
            <Container id="PlaneStress2D" pid="Plane Stress" class="Groups" nDim="2D" axiSym="No" kinemType="SmallDisplacements" GiDEntity="surface" GiDValidMesh="Triangle,Quadrilateral" strucType="Solid,Generic" idTemplate="Solid2DElement" icon="femelements.gif" help="Small Displacement 2D Plane Stress" open="0"/>
            <Container id="PlaneStrain2D" pid="Plane Strain" class="Groups" nDim="2D" axiSym="No" kinemType="SmallDisplacements" GiDEntity="surface" GiDValidMesh="Triangle,Quadrilateral" strucType="Solid" idTemplate="Solid2DElement" icon="femelements.gif" help="Small Displacement 2D Plane Strain" open="0"/>
            <Container id="Axisymmetric2D" pid="Axisymmetric SD" class="Groups" nDim="2D" axiSym="Yes" kinemType="SmallDisplacements" GiDEntity="surface" GiDValidMesh="Triangle,Quadrilateral" strucType="Solid,Generic" idTemplate="Solid2DElement" icon="femelements.gif" help="Small Displacement 2D Axisymmetric" open="0"/>
            <Container id="SolidElement3D" pid="Solid Element" class="Groups" nDim="3D" kinemType="SmallDisplacements" GiDEntity="volume" GiDValidMesh="Tetrahedra,Hexahedra" strucType="Solid,Generic" idTemplate="Solid3DElement" icon="femelements.gif" help="Small Displacement 3D" open="0"/>
            <Container id="BeamElement" pid="Beam Element" class="Groups" nDim="3D" kinemType="SmallDisplacements" strucType="Beam" idTemplate="BeamElement" GiDEntity="line" icon="femelements.gif" help="Beam Element type" open="0"/>
            <Container id="CrisfieldTrussElement" pid="Crisfield truss element" state="hidden" class="Groups" strucType="Truss" idTemplate="TrussElement" GiDEntity="line" nDim="3D" icon="femelements.gif" help="Crisfield truss element" open="0"/>
            <Container id="ShellThick" pid="Shell thick" class="Groups" nDim="3D" kinemType="SmallDisplacements" GiDEntity="surface" GiDValidMesh="Quadrilateral" strucType="Shell" idTemplate="ShellElementQ" icon="femelements.gif" help="Shell thick" open="0"/>
            <Container id="ShellThickCR" pid="Shell thick LD" class="Groups" nDim="3D" kinemType="LargeDisplacements" GiDEntity="surface" GiDValidMesh="Quadrilateral" strucType="Shell" idTemplate="ShellElementQ" icon="femelements.gif" help="Shell thick" open="0"/>
            <Container id="ShellThin" pid="Shell thin" class="Groups" nDim="3D" kinemType="SmallDisplacements" GiDEntity="surface" GiDValidMesh="Triangle" strucType="Shell" idTemplate="ShellElementT" icon="femelements.gif" help="Shell thin" open="0"/>
            <Container id="ShellThinCR" pid="Shell thin LD" class="Groups" nDim="3D" kinemType="LargeDisplacements" GiDEntity="surface" GiDValidMesh="Triangle" strucType="Shell" idTemplate="ShellElementT" icon="femelements.gif" help="Shell thin" open="0"/>
            <Container id="EBST" pid="EBST (formulation)" state="hidden" class="Groups" nDim="3D" GiDEntity="surface" strucType="Shell" idTemplate="ShellElementT" icon="femelements.gif" help="Total Lagrangian" open="0"/>
            <Container id="Membrane" pid="Membrane" class="Groups" nDim="3D" kinemType="SmallDisplacements" GiDEntity="surface" strucType="Membrane" idTemplate="MembraneElement" icon="femelements.gif" help="Membrane element type" open="0"/>
            <Container id="TotalLagrangian2DPlaneStress" pid="Plane Stress TL" state="hidden" class="Groups" nDim="2D" axiSym="No" kinemType="LargeDisplacements" GiDEntity="surface" GiDValidMesh="Triangle,Quadrilateral" strucType="Solid,Generic" idTemplate="Solid2DElement" icon="femelements.gif" help="Total Lagrangian 2D Plane Stress" open="0"/>
            <Container id="TotalLagrangian2DPlaneStrain" pid="Plane Strain TL" state="hidden" class="Groups" nDim="2D" axiSym="No" kinemType="LargeDisplacements" GiDEntity="surface" GiDValidMesh="Triangle,Quadrilateral" strucType="Solid,Generic" idTemplate="Solid2DElement" icon="femelements.gif" help="Total Lagrangian 2D Plane Strain" open="0"/>
            <Container id="TotalLagrangian3D" pid="Solid Element TL" state="hidden" class="Groups" nDim="3D" kinemType="LargeDisplacements" GiDEntity="volume" GiDValidMesh="Tetrahedra,Hexahedra" strucType="Solid,Generic" idTemplate="Solid3DElement" icon="femelements.gif" help="Total Lagrangian 3D" open="0"/>
            <Container id="UpdatedLagrangian2DPlaneStress" pid="Plane Stress UL" state="hidden" class="Groups" nDim="2D" axiSym="No" kinemType="LargeDisplacements" GiDEntity="surface" GiDValidMesh="Triangle,Quadrilateral" strucType="Solid,Generic" idTemplate="Solid2DElement" icon="femelements.gif" help="Updated Lagrangian 2D Plane Stress" open="0"/>
            <Container id="UpdatedLagrangian2DPlaneStrain" pid="Plane Strain UL" state="hidden" class="Groups" nDim="2D" axiSym="No" kinemType="LargeDisplacements" GiDEntity="surface" GiDValidMesh="Triangle,Quadrilateral" strucType="Solid,Generic" idTemplate="Solid2DElement" icon="femelements.gif" help="Updated Lagrangian 2D Plane Strain" open="0"/>
            <Container id="UpdatedLagrangian3D" pid="Solid Element UL" state="hidden" class="Groups" nDim="3D" kinemType="LargeDisplacements" GiDEntity="volume" GiDValidMesh="Tetrahedra,Hexahedra" strucType="Solid,Generic" idTemplate="Solid3DElement" icon="femelements.gif" help="Updated Lagrangian 3D" open="0"/>
            <Container id="SpatialLagrangian2DPlaneStress" pid="Plane Stress LD" class="Groups" nDim="2D" axiSym="No" kinemType="LargeDisplacements" GiDEntity="surface" GiDValidMesh="Triangle,Quadrilateral" strucType="Solid,Generic" idTemplate="Solid2DElement" icon="femelements.gif" help="Spatial Lagrangian 2D Plane Stress" open="0"/>
            <Container id="SpatialLagrangian2DPlaneStrain" pid="Plane Strain LD" class="Groups" nDim="2D" axiSym="No" kinemType="LargeDisplacements" GiDEntity="surface" GiDValidMesh="Triangle,Quadrilateral" strucType="Solid,Generic" idTemplate="Solid2DElement" icon="femelements.gif" help="Spatial Lagrangian 2D Plane Strain" open="0"/>
            <Container id="SpatialLagrangian2DAxisymmetric" pid="Axisymmetric LD" class="Groups" nDim="2D" axiSym="Yes" kinemType="LargeDisplacements" GiDEntity="surface" GiDValidMesh="Triangle,Quadrilateral" strucType="Solid,Generic" idTemplate="Solid2DElement" icon="femelements.gif" help="Spatial Lagrangian 2D Axisymmetric" open="0"/>
            <Container id="SpatialLagrangian3D" pid="Solid Element" class="Groups" nDim="3D" kinemType="LargeDisplacements" GiDEntity="volume" GiDValidMesh="Tetrahedra,Hexahedra" strucType="Solid,Generic" idTemplate="Solid3DElement" icon="femelements.gif" help="Spatial Lagrangian 3D" open="0"/>
        </Container>
        <Container id="Loads" pid="Loads" help="Loads" open="0" icon="loads.gif">
            <Container id="VolumeAcceleration" pid="Self weight" class="Groups" idTemplate="BodyForce" icon="groupsTreeNew.gif" help="Gravity (Body Force)" open="0"/>
            <Container id="Load" pid="Load" class="SameTemplateGroups" help="External Load" open="0" icon="groupsTreeNew.gif">
                <Container id="PointLoad2D" pid="Over Points" nDim="2D" axiSym="No" class="Groups" idTemplate="PointLoad" GiDEntity="point" icon="groupsTreeNew.gif" GiDValidMesh="Node" help="Point Load" open="0"/>
                <Container id="PointLoad3D" pid="Over Points" nDim="3D" class="Groups" idTemplate="PointLoad" GiDEntity="point" icon="groupsTreeNew.gif" GiDValidMesh="Node" help="Point Load" open="0"/>
                <Container id="AxisymPointLoad" pid="Over AxiSym Points" axiSym="Yes" class="Groups" idTemplate="PointLoad" GiDEntity="point" icon="groupsTreeNew.gif" GiDValidMesh="Node" help="Point Load" open="0"/>
                <Container id="LineLoad" pid="Over Lines" nDim="2D" axiSym="No" class="Groups" idTemplate="LineLoad" GiDEntity="line" GiDValidMesh="Triangle,Quadrilateral" strucType="Beam,Solid,Generic" icon="groupsTreeNew.gif" help="Line Load" open="0"/>
                <Container id="AxisymLineLoad" pid="Over AxiSym Lines" nDim="2D" axiSym="Yes" class="Groups" idTemplate="LineLoad" GiDEntity="line" GiDValidMesh="Triangle,Quadrilateral" strucType="Solid,Generic" icon="groupsTreeNew.gif" help="Axisymmetric Line Load" open="0"/>
                <Container id="BeamLoad3D" pid="Over Lines" nDim="3D" class="Groups" idTemplate="LineLoad" GiDEntity="line" GiDValidMesh="Linear" strucType="Beam" icon="groupsTreeNew.gif" help="Line Load in 3D" open="0"/>
                <Container id="SurfaceLoad2D" pid="Over Surfaces" nDim="2D" axiSym="No" class="Groups" idTemplate="FaceLoad" GiDEntity="surface" GiDValidMesh="Triangle,Quadrilateral" strucType="Plate" icon="groupsTreeNew.gif" help="Define Surface Load" open="0"/>
                <Container id="SurfaceLoad3D" pid="Over Surfaces" nDim="3D" class="Groups" idTemplate="FaceLoad" GiDEntity="surface" GiDValidMesh="Triangle,Quadrilateral,Tetrahedra,Hexahedra" strucType="Shell,Membrane,Solid,Generic" icon="groupsTreeNew.gif" help="Define Surface Load" open="0"/>
            </Container>
            <Container id="Moment" pid="Moment Load" nDim="3D" class="SameTemplateGroups" help="External Load" open="0" icon="groupsTreeNew.gif">
                <Container id="PointMoment" pid="Over Points" nDim="3D" class="Groups" idTemplate="PointMoment" GiDEntity="point" icon="groupsTreeNew.gif" GiDValidMesh="Node" help="Bending Moment" open="0"/>
            </Container>
            <Container id="Pressure" pid="Pressure Load" class="SameTemplateGroups" help="Pressure Load" open="0" icon="groupsTreeNew.gif">
                <Container id="LinePressureLoad" pid="Over Lines" nDim="2D" axiSym="No" class="Groups" idTemplate="LinePressure" GiDEntity="line" GiDValidMesh="Triangle,Quadrilateral" strucType="Beam,Solid,Generic" icon="groupsTreeNew.gif" help="Line Face Pressure" open="0"/>
                <Container id="AxisymLinePressureLoad" pid="Over Axisym Lines" nDim="2D" axiSym="Yes" class="Groups" idTemplate="LinePressure" GiDEntity="line" GiDValidMesh="Triangle,Quadrilateral" strucType="Solid,Generic" icon="groupsTreeNew.gif" help="Axisymmetric Line Face Pressure" open="0"/>
                <Container id="BeamPressure3D" pid="Over Lines" nDim="3D" class="Groups" idTemplate="LinePressure" GiDEntity="line" GiDValidMesh="Linear" strucType="Beam" icon="groupsTreeNew.gif" help="Line Pressure in 3D" open="0"/>
                <Container id="SurfacePressureLoad2D" pid="Over Surfaces" nDim="2D" axiSym="No" class="Groups" idTemplate="FacePressure" GiDEntity="surface" GiDValidMesh="Triangle,Quadrilateral" strucType="Plate" icon="groupsTreeNew.gif" help="Define Surface Pressure" open="0"/>
                <Container id="SurfacePressureLoad3D" pid="Over Surfaces" nDim="3D" class="Groups" idTemplate="FacePressure" GiDEntity="surface" GiDValidMesh="Triangle,Quadrilateral,Tetrahedra,Hexahedra" strucType="Shell,Membrane,Solid,Generic" icon="groupsTreeNew.gif" help="Define Surface Load" open="0">
                  {{pressureContent}}</Container>
            </Container>
            <Item id="IncrementalLoad" pid="Incremental" soluType="Dynamic,Quasi-Static,Pseudo-Dynamic" dv="No" ivalues="Yes,No" values="Yes,No" help="Incremental Loads"/>
        </Container>
        <Container id="Conditions" pid="Boundary conditions" help="Boundary Conditions" open="0" icon="boundarycond.gif">
            <Container id="Displacements" pid="Displacements" class="Groups" idTemplate="Displacements" icon="groupsTreeNew.gif" help="Displacements" open="0" dv="Yes" ivalues="Yes,No" values="Yes,No">
              {{DisplacementsBCcontent}}
            </Container>
            <Container id="Rotations" pid="Rotations" class="Groups" strucType="Beam,Plate,Shell" GiDEntity="point,line,surface" idTemplate="Displacements" icon="groupsTreeNew.gif" help="Rotations" open="0"/>
            <Item id="IncrementalMovement" pid="Incremental" soluType="Dynamic,Quasi-Static,Pseudo-Dynamic" dv="No" ivalues="Yes,No" values="Yes,No" help="Incremental Movements"/>
        </Container>
        <Container id="Results" pid="Results" help="Results" open="0" icon="outputresults.gif">
            <Item id="OutputDeltaTime" pid="Output delta time" dv="0.0" help="Output delta time"/>
            <Container id="OnNodes" pid="On nodes" class="Tab" help="On nodes" open="0">
                <Item id="Displacements" pid="Displacements" dv="Yes" ivalues="Yes,No" values="Yes,No" help="Displacements"/>
                <Item id="Velocities" pid="Velocities" dv="No" soluType="Dynamic" ivalues="Yes,No" values="Yes,No" help="Displacements"/>
                <Item id="Accelerations" pid="Accelerations" dv="No" soluType="Dynamic" ivalues="Yes,No" values="Yes,No" help="Displacements"/>
                <Item id="Rotations" pid="Rotations" dv="No" strucType="Beam,Shell,General" ivalues="Yes,No" values="Yes,No" help="Rotations"/>
                <Item id="Reactions" pid="Reactions" dv="Yes" ivalues="Yes,No" values="Yes,No" help="Reactions"/>
                <Item id="Forces" pid="Loads" dv="No" ivalues="Yes,No" values="Yes,No" help="Loads"/>
            </Container>
            <Container id="OnGaussPoints" pid="On gauss points" class="Tab" help="On gauss points" open="0">
                <Item id="StrainTensor" pid="Green-Lagrange Strain tensor" dv="No" ivalues="Yes,No" values="Yes,No" help="Green Lagrange strain tensor"/>
                <Item id="StressTensor" pid="Cauchy stress tensor" dv="No" ivalues="Yes,No" values="Yes,No" help="Cauchy stress tensor"/>
                <Item id="VonMises" pid="VonMises" dv="No" strucType="Solid,General" ivalues="Yes,No" values="Yes,No" help="Von Mises Criterion"/>
                <Item id="PlasticStrain" pid="Plastic strain" dv="No" strucType="Solid,General" ivalues="Yes,No" values="Yes,No" help="Plastic strain scalar"/>
                <Item id="DeltaPlasticStrain" pid="Plastic strain rate" dv="No" strucType="Solid,General" ivalues="Yes,No" values="Yes,No" help="Plastic strain rate scalar"/>
                <Item id="BeamMoments" pid="Beam moments" dv="No" strucType="Beam,Generic" ivalues="Yes,No" values="Yes,No" help="Beam moments"/>
                <Item id="BeamForces" pid="Beam forces" dv="No" strucType="Beam,Generic" ivalues="Yes,No" values="Yes,No" help="Beam forces"/>
                <Item id="ShellForcesLocal" pid="Shell forces - local" dv="No" strucType="Shell,Generic" ivalues="Yes,No" values="Yes,No" help="Shell forces - local"/>
                <Item id="ShellForcesGlobal" pid="Shell forces - global" dv="No" strucType="Shell,Generic" ivalues="Yes,No" values="Yes,No" help="Shell forces - global"/>
                <Item id="ShellMomentsLocal" pid="Shell moments - local" dv="No" strucType="Shell,Generic" ivalues="Yes,No" values="Yes,No" help="Shell moments - local"/>
                <Item id="ShellMomentsGlobal" pid="Shell moments - global" dv="No" strucType="Shell,Generic" ivalues="Yes,No" values="Yes,No" help="Shell moments - global"/>
                <Item id="ShellStrainLocal" pid="Shell strain - local" dv="No" strucType="Shell,Generic" ivalues="Yes,No" values="Yes,No" help="Shell strain - local"/>
                <Item id="ShellStrainGlobal" pid="Shell strain - global" dv="No" strucType="Shell,Generic" ivalues="Yes,No" values="Yes,No" help="Shell strain - global"/>
                <Item id="ShellCurvatureLocal" pid="Shell curvature - local" dv="No" strucType="Shell,Generic" ivalues="Yes,No" values="Yes,No" help="Shell curvature - local"/>
                <Item id="ShellCurvatureGlobal" pid="Shell curvature - global" dv="No" strucType="Shell,Generic" ivalues="Yes,No" values="Yes,No" help="Shell curvature - global"/>
                <Item id="MaterialDirectionX" pid="Material direction X" dv="No" strucType="Shell,Beam,Generic" ivalues="Yes,No" values="Yes,No" help="Material direction X"/>
                <Item id="MaterialDirectionY" pid="Material direction Y" dv="No" strucType="Shell,Beam,Generic" ivalues="Yes,No" values="Yes,No" help="Material direction Y"/>
                <Item id="MaterialDirectionZ" pid="Material direction Z" dv="No" strucType="Shell,Beam,Generic" ivalues="Yes,No" values="Yes,No" help="Material direction Z"/>
            </Container>
            <Container id="GiDOptions" pid="Options" class="Tab" help="GiD postprocess options" open="0">
                <Item id="GiDPostMode" pid="Result format" dv="Binary" ivalues="Ascii,Binary" values="Ascii,Binary" help="GiD result file format"/>
                <Item id="GiDWriteMeshFlag" pid="Write deformed mesh" dv="No" ivalues="Yes,No" values="Yes,No" help="Write the GiD deformed or undeformed mesh"/>
                <Item id="GiDWriteConditionsFlag" pid="Write conditions" dv="No" ivalues="Yes,No" values="Yes,No" help="Write the conditions or only element to the GiD result file"/>
                <Item id="GiDWriteParticlesFlag" pid="Write particles" dv="No" ivalues="Yes,No" values="Yes,No" help="Write the particles or only element to the GiD result file"/>
                <Item id="GiDMultiFileFlag" pid="Result file" dv="Single" ivalues="Single,Multiples" values="Single,Multiples" help="Write one GiD result file or multiple files"/>
            </Container>
        </Container>
    </RootData>
    <RootData id="Fluid" pid="Fluid" state="hiddenAll" class="application" icon="aplicationTree.gif" help="Fluid" open="1">
        <Container id="AnalysisData" pid="Analysis data" class="Tab" help="Analysis data" open="0">
            <Item id="FluidType" pid="Fluid type" class="fluidType" dv="Incompressible" ivalues="Compressible,Incompressible" values="Compressible,Incompressible" help="Fluid type"/>
            <Item id="FluidApproach" pid="Fluid Approach" class="fluidAppr" dv="Eulerian" ivalues="Eulerian,PFEM-Lagrangian" values="Eulerian,PFEM-Lagrangian" help="Fluid approach" delvalues="PFEM-Lagrangian"/>
            <Item id="FreeSurface" pid="Free surface" state="hidden" class="freeSurf" fluidAppr="Eulerian" fluidType="Incompressible" dv="No" ivalues="Yes,No" values="Yes,No" help="Free surface"/>
            <Item id="SolverTypeCompressible" pid="Solver type" class="fluidSolvTyp" freeSurf="No" fluidType="Compressible" dv="FSSE-ElementBased" ivalues="FSSE-ElementBased" values="Fractional step semi-explicit element based" help="Fractional step"/>
            <Item id="SolverType" pid="Solver type" class="fluidSolvTyp" freeSurf="No" fluidType="Incompressible" fluidAppr="Eulerian" dv="ElementBased" ivalues="Monolithic,ElementBased" values="Monolithic,Fractional step" help="SolverType"/>
            <Item id="SolverTypeFreeSurf" pid="Solver type" class="fluidSolvTyp" freeSurf="Yes" dv="LevelSet" ivalues="LevelSet" values="Fractional step level set" help="SolverType"/>
            <Item id="TurbulenceModel" pid="Turbulence model" class="TurbulenceModelType" fluidType="Incompressible" fluidSolvTyp="Monolithic,ElementBased" ivalues="Off,Smagorinsky-Lilly,Spalart-Allmaras" dv="Off" values="Off,Smagorinsky-Lilly,Spalart-Allmaras" help="Select the active tubulence model"/>
            <Item id="SmagorinskyConstant" pid="Smagorinsky constant" fluidType="Incompressible" TurbulenceModelType="Smagorinsky-Lilly" dv="0.1" help="The Smagorinsky constant usually has the value: Cs = 0.1 - 0.2 "/>
            <Item id="TurbulentViscosity" pid="Turbulent viscosity" fluidType="Incompressible" TurbulenceModelType="Spalart-Allmaras" dv="0.01" help="Define the turbulent viscosity value"/>
            <Container id="Spalart-AllmarasGroupId2D" pid="Spalart-Allmaras groups" nDim="2D" GiDEntity="point,line" class="Groups" idTemplate="TurbulenceGroupId" fluidType="Incompressible" TurbulenceModelType="Spalart-Allmaras" icon="groupsTreeNew.gif" help="Select the group identifier" open="0"/>
            <Container id="Spalart-AllmarasGroupId3D" pid="Spalart-Allmaras groups" nDim="3D" GiDEntity="point,line,surface" class="Groups" idTemplate="TurbulenceGroupId" fluidType="Incompressible" TurbulenceModelType="Spalart-Allmaras" icon="groupsTreeNew.gif" help="Select the group identifier" open="0"/>
        </Container>
        <Container id="SolutionStrategy" pid="Solution strategy" help="Solution Strategy" open="0" icon="solstrategy.gif">
            <Container id="ParallelType" pid="Parallel type" class="Tab" help="Parallel type" open="0" icon="groupsTreeNew.gif">
                <Item id="ParallelSolutionType" pid="Parallelization" dv="OpenMP" class="PSolutionType" ivalues="OpenMP,MPI" values="OpenMP,MPI" help=""/>
                <Item id="MPINumberOfProcessors" pid="Number of processors" dv="2" PSolutionType="MPI" help="Number of processors"/>
                <Item id="OpenMPNumberOfThreads" pid="Number of threads" dv="2" PSolutionType="OpenMP" help="Number of threads"/>
            </Container>
            <Container id="SolverTypes" pid="Linear solver" class="Tab" help="Solver types" open="0" icon="groupsTreeNew.gif">
                <Item id="MonolithicLinearSolverType" pid="Linear solver type" class="monolithicLinearSolvTyp" fluidSolvTyp="Monolithic" fluidType="Incompressible" dv="Direct" ivalues="Direct,Iterative" values="Direct,Iterative" help=""/>
                <Item id="MonolithicDirectSolverType" pid="Solver" monolithicLinearSolvTyp="Direct" fluidSolvTyp="Monolithic" fluidType="Incompressible" dv="SuperLU" ivalues="SuperLU,ParallelMKLPardiso" values="Super LU,Parallel MKL Pardiso" help=""/>
                <Item id="MonolithicIterativeSolverType" pid="Iterative solver type" class="monolithiciterativesolvertype" monolithicLinearSolvTyp="Iterative" fluidSolvTyp="Monolithic" fluidType="Incompressible" dv="BiConjugateGradientStabilized" ivalues="BiConjugateGradientStabilized,GMRES-UP Block,SuperLUIterativeSolver,AMGCL" values="BiConjugate gradient stabilized,GMRES-UP Block,SuperLU iterative solver,AMGCL" help="Iterative solver type options"/>
                <Item id="MonolithicISTolerance" pid="Solver tolerance" fluidSolvTyp="Monolithic" monolithicLinearSolvTyp="Iterative" dv="1E-5" help=""/>
                <Item id="MonolithicISMaximumIteration" pid="Solver maximum iterations" fluidSolvTyp="Monolithic" monolithicLinearSolvTyp="Iterative" dv="5000" help="Monolithic solver maximum iteration numbers"/>
                <Item id="MonolithicMixedUPKrylovSpaceDimension" pid="Krylov space dimension" monolithiciterativesolvertype="GMRES-UP Block" fluidSolvTyp="Monolithic" monolithicLinearSolvTyp="Iterative" dv="30" help="Mixed UP Krylov space dimension"/>
                <Item id="MonolithicPreconditionerType" pid="Preconditioner type" monolithicLinearSolvTyp="Iterative" fluidSolvTyp="Monolithic" fluidType="Incompressible" dv="Diagonal" ivalues="None,Diagonal,ILU0" values="None,Diagonal,ILU0" help=""/>
                <Item id="VelocityLinearSolverType" pid="Velocity-Solver type" class="velocityLinearSolvTyp" fluidSolvTyp="PressureSplitting,EdgeBased,ElementBased" fluidType="Incompressible" dv="Iterative" ivalues="Direct,Iterative" values="Direct,Iterative" help=""/>
                <Item id="VelocityDirectSolverType" pid="Velocity solver" velocityLinearSolvTyp="Direct" fluidSolvTyp="PressureSplitting,EdgeBased,ElementBased" fluidType="Incompressible" dv="SuperLU" ivalues="SkylineLUFactorization,SuperLU,ParallelMKLPardiso" values="Skyline LU factorization,Super LU,Parallel MKL Pardiso" help=""/>
                <Item id="VelocityIterativeSolverType" pid="Velocity solver" class="VelocityIterativeSolverType" velocityLinearSolvTyp="Iterative" fluidSolvTyp="PressureSplitting,EdgeBased,ElementBased" fluidType="Incompressible" dv="BiConjugateGradientStabilized" ivalues="ConjugateGradient,BiConjugateGradientStabilized,GMRES,AMGCL" values="Conjugate gradient,BiConjugate gradient stabilized,GMRES,AMGCL" help=""/>
                <Item id="VelocityISTolerance" pid="Velocity solver tolerance" fluidSolvTyp="PressureSplitting,EdgeBased" velocityLinearSolvTyp="Iterative" dv="1E-5" help=""/>
                <Item id="VelocityKrylovType" pid="Velocity solver - Krylov type" fluidSolvTyp="PressureSplitting,EdgeBased,ElementBased" velocityLinearSolvTyp="Iterative" VelocityIterativeSolverType="AMGCL" dv="GMRES" ivalues="BICGSTAB,CG,GMRES" values="BICGSTAB,CG,GMRES" help=""/>
                <Item id="VelocitySmootherType" pid="Velocity solver - smoother type" fluidSolvTyp="PressureSplitting,EdgeBased,ElementBased" velocityLinearSolvTyp="Iterative" VelocityIterativeSolverType="AMGCL" dv="ILU0" ivalues="ILU0,DAMPED_JACOBI,SPAI0" values="ILU0,DAMPED_JACOBI,SPAI0" help=""/>
                <Item id="VelocityISMaximumIteration" pid="Velocity solver - maximum iterations" fluidSolvTyp="PressureSplitting,EdgeBased,ElementBased" velocityLinearSolvTyp="Iterative" dv="100" help=""/>
                <Item id="VelocityPreconditionerType" pid="Velocity preconditioner type" velocityLinearSolvTyp="Iterative" fluidSolvTyp="PressureSplitting,EdgeBased" fluidType="Incompressible" dv="ILU0" ivalues="None,Diagonal,ILU0" values="None,Diagonal,ILU0" help=""/>
                <Item id="PressureLinearSolverType" pid="Pressure-Solver type" class="pressureLinearSolvTyp" fluidSolvTyp="PressureSplitting,EdgeBased,ElementBased" fluidType="Incompressible" dv="Iterative" ivalues="Direct,Iterative" values="Direct,Iterative" help=""/>
                <Item id="PressureDirectSolverType" pid="Pressure solver" pressureLinearSolvTyp="Direct" fluidSolvTyp="PressureSplitting,EdgeBased,ElementBased" fluidType="Incompressible" dv="SuperLU" ivalues="SkylineLUFactorization,SuperLU,ParallelMKLPardiso" values="Skyline LU factorization,Super LU,Parallel MKL Pardiso" help=""/>
                <Item id="PressureIterativeSolverType" pid="Pressure solver" class="PressureIterativeSolverType" pressureLinearSolvTyp="Iterative" fluidSolvTyp="PressureSplitting,EdgeBased,ElementBased" fluidType="Incompressible" dv="AMGCL" ivalues="ConjugateGradient,BiConjugateGradientStabilized,AMGCL" values="Conjugate gradient,BiConjugate gradient stabilized,AMGCL" help=""/>
                <Item id="PressureISTolerance" pid="Pressure solver tolerance" pressureLinearSolvTyp="Iterative" fluidSolvTyp="PressureSplitting,EdgeBased" dv="1E-5" help=""/>
                <Item id="PressureKrylovType" pid="Pressure solver - Krylov type" pressureLinearSolvTyp="Iterative" fluidSolvTyp="PressureSplitting,EdgeBased,ElementBased" PressureIterativeSolverType="AMGCL" dv="CG" ivalues="BICGSTAB,CG,GMRES" values="BICGSTAB,CG,GMRES"/>
                <Item id="PressureSmootherType" pid="Pressure solver - smoother type" pressureLinearSolvTyp="Iterative" fluidSolvTyp="PressureSplitting,EdgeBased,ElementBased" PressureIterativeSolverType="AMGCL" dv="DAMPED_JACOBI" ivalues="DAMPED_JACOBI,ILU0,SPAI0" values="DAMPED_JACOBI,ILU0,SPAI0"/>
                <Item id="PressureISMaximumIteration" pid="Pressure solver - maximum iterations" pressureLinearSolvTyp="Iterative" fluidSolvTyp="PressureSplitting,ElementBased,EdgeBased" dv="100" help=""/>
                <Item id="PressurePreconditionerType" pid="Pressure preconditioner type" pressureLinearSolvTyp="Iterative" fluidSolvTyp="PressureSplitting,EdgeBased" fluidType="Incompressible" dv="ILU0" ivalues="None,Diagonal,ILU0" values="None,Diagonal,ILU0" help=""/>
                <Item id="LinearSolverTypeCompressible" pid="Linear solver type" class="linearSolvTyp" fluidType="Compressible" dv="Direct" ivalues="Direct,Iterative" values="Direct,Iterative" help=""/>
                <Item id="DirectSolverTypeCompressible" pid="Direct solver type" linearSolvTyp="Direct" fluidType="Compressible" dv="SkylineLUFactorization" ivalues="SkylineLUFactorization,SuperLU,ParallelMKLPardiso" values="Skyline LU factorization,Super LU,Parallel MKL Pardiso" help=""/>
                <Item id="IterativeSolverTypeCompressible" pid="Iterative solver type" linearSolvTyp="Iterative" fluidType="Compressible" dv="ConjugateGradient" ivalues="ConjugateGradient" values="Conjugate gradient" help=""/>
                <Item id="PreconditionerTypeCompressible" pid="Preconditioner type" linearSolvTyp="Iterative" dv="Diagonal" fluidType="Compressible" ivalues="None,Diagonal" values="None,Diagonal" help=""/>
            </Container>
            <Container id="Advanced" pid="Advanced" fluidType="Incompressible" class="Tab" help="Advanced Solver Parameters" open="0" icon="groupsTreeNew.gif">
                <Item id="PredictorCorrector" pid="Predictor corrector" fluidAppr="Eulerian" fluidSolvTyp="ElementBased,EdgeBased" dv="False" ivalues="True,False" values="True,False" help=""/>
                <Item id="RelativeVelocityTolerance" pid="Relative velocity tolerance" fluidAppr="Eulerian" fluidSolvTyp="Monolithic,PressureSplitting,ElementBased,EdgeBased" dv="1E-3" help="Relative velocity tolerance"/>
                <Item id="AbsoluteVelocityTolerance" pid="Absolute velocity tolerance" fluidAppr="Eulerian" fluidSolvTyp="Monolithic,PressureSplitting" dv="1E-5" help="Absolute velocity tolerance"/>
                <Item id="MaximumVelocityIterations" pid="Maximum velocity iterations" fluidAppr="Eulerian" fluidSolvTyp="ElementBased,EdgeBased" dv="4" help=""/>
                <Item id="RelativePressureTolerance" pid="Relative pressure tolerance" fluidAppr="Eulerian" fluidSolvTyp="Monolithic,PressureSplitting,ElementBased,EdgeBased" dv="1E-3" help="Relative pressure tolerance"/>
                <Item id="AbsolutePressureTolerance" pid="Absolute pressure tolerance" fluidAppr="Eulerian" fluidSolvTyp="Monolithic,PressureSplitting" dv="1E-5" help="Absolute pressure tolerance"/>
                <Item id="MaximumPressureIterations" pid="Maximum pressure iterations" fluidAppr="Eulerian" fluidSolvTyp="ElementBased,EdgeBased" dv="3" help=""/>
                <Item id="MaximumIterations" pid="Maximum iterations" fluidAppr="Eulerian" fluidSolvTyp="Monolithic,PressureSplitting" dv="10" help=""/>
                <Item id="TimeOrder" pid="Time order" dv="2" fluidAppr="Eulerian" fluidSolvTyp="ElementBased,EdgeBased" ivalues="1,2" values="1,2" help=""/>
                <Item id="LaplacianForm" pid="Laplacian form" state="hidden" dv="Discrete" fluidAppr="Eulerian" fluidSolvTyp="ElementBased,EdgeBased" ivalues="Continuous,Discrete,DiscreteWithDt" values="Continuous,Discrete,Discrete with dt" help=""/>
                <Item id="DynamicTau" pid="Use dt in stabilization" dv="0.01" fluidAppr="Eulerian" CBState="normal" values="1.0,0.1,0.01,0.001,0.0" help=""/>
                <Item id="OssSwitch" pid="Use orthogonal subscales" dv="1" ivalues="0,1" values="0,1" fluidAppr="Eulerian" help=""/>
                <Item id="RedistanceFrequency" pid="Redistance frequency" fluidAppr="Eulerian" fluidSolvTyp="LevelSet" PSolutionType="OpenMP" dv="5" help="Redistance frequency"/>
                <Item id="ExtrapolationLayers" pid="Extrapolation layers" fluidAppr="Eulerian" fluidSolvTyp="LevelSet" PSolutionType="OpenMP" dv="10" help="Extrapolation layers"/>
                <Item id="StabdtPressureFactor" pid="Stabilized dt pressure factor" fluidAppr="Eulerian" fluidSolvTyp="LevelSet" PSolutionType="OpenMP" dv="1.0" help="Stabilized dt pressure factor"/>
                <Item id="StabdtConvectionFactor" pid="Stabilized convection factor" fluidAppr="Eulerian" fluidSolvTyp="LevelSet" PSolutionType="OpenMP" dv="0.01" help="Stabilized convection factor"/>
                <Item id="WallLawY" pid="Wall law value" fluidSolvTyp="LevelSet" fluidAppr="Eulerian" PSolutionType="OpenMP" dv="0.0001" help="Wall law value"/>
                <Item id="SafetyFactor" pid="Safety factor" fluidSolvTyp="LevelSet" fluidAppr="Eulerian" PSolutionType="OpenMP" dv="0.8" help="Safety factor"/>
                <Item id="NumberOfInitialSteps" pid="Number of initial steps" fluidSolvTyp="LevelSet" fluidAppr="Eulerian" PSolutionType="OpenMP" dv="0.0" help="Number of initial steps"/>
                <Item id="LaplacianCorrectionPressure" pid="Laplacian correction of pressure" fluidAppr="PFEM-Lagrangian" dv="No" ivalues="Yes,No" values="Yes,No" help="Use Laplacian correction of pressure"/>
                <Container id="Boundingbox" pid="Bounding Box" idTemplate="BoundingBox" fluidAppr="PFEM-Lagrangian" class="Tab">
                    <Item id="MaxX" pid="Max X" dv="0.0" help="Max X"/>
                    <Item id="MaxY" pid="Max Y" dv="0.0" help="Max Y" sbi="PickCoordinates" sbp="Pick" sbxp="MaxX,MaxY,MaxZ"/>
                    <Item id="MaxZ" pid="Max Z" dv="0.0" help="Max Z"/>
                    <Item id="MinX" pid="Min X" dv="0.0" help="Min X"/>
                    <Item id="MinY" pid="Min Y" dv="0.0" help="Min Y" sbi="PickCoordinates" sbp="Pick" sbxp="MinX,MinY,MinZ"/>
                    <Item id="MinZ" pid="Min Z" dv="0.0" help="Min Z"/>
                </Container>
            </Container>
            <Container id="LevelSetBodyForce" pid="Body force" fluidSolvTyp="LevelSet" fluidAppr="Eulerian" PSolutionType="OpenMP" help="Body forces" class="Tab" open="0">
                <Item id="GravityValue" pid="Gravity value" dv="9.8" help="Gravity value"/>
                <Item id="Cx" pid="Cx" dv="0.0" help="X Vector"/>
                <Item id="Cy" pid="Cy" dv="0.0" help="Y Vector"/>
                <Item id="Cz" pid="Cz" dv="-1.0" nDim="3D" help="Z Vector"/>
            </Container>
            <Container id="PorousZones" pid="Porous zones" fluidSolvTyp="LevelSet" PSolutionType="OpenMP" help="Porous zones" open="0">
                <Item id="UseErgunEquation" pid="Use Ergun equation" dv="No" class="ErgunEquationType" ivalues="Yes,No" values="Yes,No" help="Use Ergun equation"/>
                <Container id="ErgunEquationNo" pid="Zones" class="Groups" ErgunEquationType="No" nDim="3D" GiDEntity="line,surface,volume" fluidSolvTyp="LevelSet" PSolutionType="OpenMP" idTemplate="PorosityDarcy" icon="groupsTreeNew.gif" help="" open="0"/>
                <Container id="ErgunEquationYes" pid="Zones" class="Groups" ErgunEquationType="Yes" nDim="3D" GiDEntity="line,surface,volume" fluidSolvTyp="LevelSet" PSolutionType="OpenMP" idTemplate="PorosityDiameter" icon="groupsTreeNew.gif" help="" open="0"/>
            </Container>
        </Container>
        <Container id="ProblemParameters" pid="Problem parameters" help="Problem parameters" open="0" dv="fh" values="">
            <Item id="StartTime" pid="Start time" dv="0.0" fluidAppr="Eulerian" help=""/>
            <Item id="EndTime" pid="End time" dv="1" help=""/>
            <Item id="UseAutomaticDeltaTime" pid="Automatic delta time" fluidSolvTyp="ElementBased,Monolithic" fluidAppr="Eulerian" class="deltatimetype" dv="Fixed" ivalues="Fixed,Automatic" values="Fixed,Automatic" help="Select the Delta time option to be used"/>
            <Item id="DeltaTime" deltatimetype="Fixed" pid="Delta time" dv="0.001" help=""/>
            <Item id="TargetCFL" pid="Target CFL" deltatimetype="Automatic" dv="5.0" help=""/>
            <Item id="DivergenceCleareanceStep" pid="Divergence cleareance step" dv="50" fluidAppr="Eulerian" fluidType="Incompressible" help="Define the divergence cleareance step value"/>
            <Item id="EnvironmentTemperature" pid="Environment temperature" fluidAppr="Eulerian" fluidType="Incompressible" dv="0.0" help=""/>
            <Item id="MaxVart" pid="Max Dt" dv="0.0" fluidAppr="PFEM-Lagrangian" state="hidden" help="Max time variation"/>
            <Item id="MinVart" pid="Min Dt" dv="0.0" fluidAppr="PFEM-Lagrangian" state="hidden" help="Min time variation"/>
            <Item id="PFEMBodyForceGravity" pid="Gravity value" dv="9.81" fluidAppr="PFEM-Lagrangian" help="Gravity value"/>
        </Container>
        <Container id="Properties" pid="Properties" class="Properties" idTemplate="PropertiesFluid" icon="propsTreeNew.gif" help="Add a new Property" open="0"/>
        <Container id="Elements" pid="Elements" help="Elements" open="0">
            <Container id="ASGS2D" pid="ASGS" class="Groups" nDim="2D" GiDEntity="surface" fluidAppr="Eulerian" fluidSolvTyp="PressureSplitting" idTemplate="Fluid2DElement" icon="groupsTreeNew.gif" help="ASGS" open="0"/>
            <Container id="ASGS3D" pid="ASGS" class="Groups" nDim="3D" GiDEntity="volume" fluidAppr="Eulerian" fluidSolvTyp="PressureSplitting" idTemplate="Fluid3DElement" icon="groupsTreeNew.gif" help="ASGS" open="0"/>
            <Container id="Fluid2DMonolithic" pid="Fluid" class="Groups" nDim="2D" GiDEntity="surface" fluidAppr="Eulerian" fluidSolvTyp="Monolithic" idTemplate="Fluid2DElement" icon="groupsTreeNew.gif" help="Select the fluid 2D element type" open="0"/>
            <Container id="Fluid3DMonolithic" pid="Fluid" class="Groups" nDim="3D" GiDEntity="volume" fluidAppr="Eulerian" fluidSolvTyp="Monolithic" idTemplate="Fluid3DElement" icon="groupsTreeNew.gif" help="Select the fluid 2D element type" open="0"/>
            <Container id="Fluid2D" pid="Fluid" class="Groups" nDim="2D" GiDEntity="surface" fluidAppr="Eulerian" fluidSolvTyp="EdgeBased" idTemplate="Fluid2DElement" icon="groupsTreeNew.gif" help="Fluid" open="0"/>
            <Container id="Fluid3D" pid="Fluid" class="Groups" nDim="3D" GiDEntity="volume" fluidAppr="Eulerian" fluidSolvTyp="EdgeBased" idTemplate="Fluid3DElement" icon="groupsTreeNew.gif" help="Fluid" open="0"/>
            <Container id="LevelSetFluid2D" pid="Fluid" class="Groups" nDim="2D" GiDEntity="surface" fluidAppr="Eulerian" fluidSolvTyp="LevelSet" idTemplate="Fluid2DElement" icon="groupsTreeNew.gif" help="Fluid" open="0"/>
            <Container id="LevelSetFluid3D" pid="Fluid" class="Groups" nDim="3D" GiDEntity="volume" fluidAppr="Eulerian" fluidSolvTyp="LevelSet" idTemplate="Fluid3DElement" icon="groupsTreeNew.gif" help="Fluid" open="0"/>
            <Container id="VMS2D" pid="Fluid" class="Groups" nDim="2D" GiDEntity="surface" fluidAppr="Eulerian" fluidSolvTyp="ElementBased" idTemplate="Fluid2DElement" icon="groupsTreeNew.gif" help="Fluid" open="0"/>
            <Container id="VMS3D" pid="Fluid" class="Groups" nDim="3D" GiDEntity="volume" fluidAppr="Eulerian" fluidSolvTyp="ElementBased" idTemplate="Fluid3DElement" icon="groupsTreeNew.gif" help="Fluid" open="0"/>
            <Container id="PFEM2D" pid="Fluid" class="Groups" nDim="2D" GiDEntity="surface" fluidAppr="PFEM-Lagrangian" idTemplate="Fluid2DElement" icon="groupsTreeNew.gif" help="Fluid" open="0"/>
            <Container id="PFEM3D" pid="Fluid" class="Groups" nDim="3D" GiDEntity="volume" fluidAppr="PFEM-Lagrangian" idTemplate="Fluid3DElement" icon="groupsTreeNew.gif" help="Fluid" open="0"/>
        </Container>
        <Container id="InitialConditions" pid="Initial conditions" fluidAppr="Eulerian" help="Initial Conditions" open="0">
            <Container id="InitialVelocity" pid="Initial velocity" class="Groups" idTemplate="InitialVelocity" icon="groupsTreeNew.gif" help="Initial Conditions" open="0"/>
            <Container id="InitialTemperature" pid="Initial temperature" fluidType="Compressible" class="Groups" idTemplate="InitialTemperature" icon="groupsTreeNew.gif" help="Initial Conditions" open="0"/>
            <Container id="InitialPressure" pid="Initial pressure" class="Groups" idTemplate="InitialPressure" icon="groupsTreeNew.gif" help="Initial Conditions" open="0"/>
        </Container>
        <Container id="Conditions" pid="Boundary conditions" help="Boundary Conditions" open="0">
            <Container id="InletVelocity" pid="Inlet velocity" class="Groups" fluidAppr="Eulerian" fluidType="Incompressible" idTemplate="InletVelocity" icon="groupsTreeNew.gif" help="Inlet velocity" open="0"/>
            <Container id="PrescribedVelocity" pid="Prescribed velocity" class="Groups" fluidAppr="Eulerian" fluidType="Compressible" idTemplate="PrescribedVelocity" icon="groupsTreeNew.gif" help="Inlet velocity" open="0"/>
            <Container id="OutletPressure" pid="Outlet pressure" class="Groups" fluidAppr="Eulerian" idTemplate="OutletPressure" GiDEntity="point,line,surface" icon="groupsTreeNew.gif" help="Outlet pressure" open="0"/>
            <Container id="Is-Slip" pid="Is-Slip" class="Groups" fluidAppr="Eulerian" fluidSolvTyp="Monolithic,ElementBased,LevelSet" idTemplate="IsSlip" GiDEntity="point,line,surface" icon="groupsTreeNew.gif" help="Slip" open="0"/>
            <Container id="WallLaw" pid="Wall law" fluidAppr="Eulerian" class="Groups" fluidSolvTyp="ElementBased" idTemplate="WallLaw" GiDEntity="point,line,surface" icon="groupsTreeNew.gif" help="Wall law" open="0"/>
            <Container id="Distance" pid="Distance" class="Groups" fluidAppr="Eulerian" fluidSolvTyp="LevelSet" idTemplate="LevelSetDistance" GiDEntity="line,surface,volume" icon="groupsTreeNew.gif" help="Distance variable for the free surface using level set method" open="0"/>
            <Container id="No-Slip" pid="No-Slip" class="Groups" fluidAppr="Eulerian" fluidSolvTyp="Monolithic,ElementBased,LevelSet,PressureSplitting" idTemplate="NoSlip" icon="groupsTreeNew.gif" help="No-Slip" open="0"/>
            <Container id="Flag-Variable" pid="Flag-Variable" fluidAppr="Eulerian" class="Groups" fluidSolvTyp="Monolithic,ElementBased,LevelSet,PressureSplitting" idTemplate="FlagVariable" icon="groupsTreeNew.gif" help="Define the flag variable properties" open="0"/>
            <Container id="PFEMWall" pid="Wall/Object" class="Groups" fluidAppr="PFEM-Lagrangian" state="hiddenAll" idTemplate="PFEMwall" icon="groupsTreeNew.gif" GiDEntity="line,surface,volume" help="" open="0"/>
            <Container id="PFEMFixedWall" pid="Fixed Wall" class="Groups" fluidAppr="PFEM-Lagrangian" idTemplate="PFEMFixedWall" icon="groupsTreeNew.gif" GiDEntity="line,surface,volume" help="" open="0"/>
            <Container id="PFEMFluidInlet" pid="Fluid Inlet" class="Groups" fluidAppr="PFEM-Lagrangian" idTemplate="PFEMFluidInlet" icon="groupsTreeNew.gif" GiDEntity="line,surface" help="" open="0"/>
        </Container>
        <Container id="Results" pid="Results" help="Results" open="0">
            <Item id="VolumeOutput" pid="Volume output" dv="Yes" nDim="3D" class="UseCuts" ivalues="Yes,No" values="Yes,No" help="Volume output"/>
            <Item id="OutputDeltaTime" pid="Output delta time" dv="0.1" help="Output delata time"/>
            <Item id="PrintInLayer" pid="Print in layer" dv="Yes" ivalues="Yes,No" values="Yes,No" help="Print in layer"/>
            <Container id="OnNodes" pid="On nodes" class="Tab" help="On nodes" open="0">
                <Item id="Velocity" pid="Velocity" dv="Yes" ivalues="Yes,No" values="Yes,No" help="Velocity"/>
                <Item id="Pressure" pid="Pressure" dv="Yes" ivalues="Yes,No" values="Yes,No" help="Pressure"/>
                <Item id="Reactions" pid="Reactions" dv="Yes" ivalues="Yes,No" values="Yes,No" help="Stresses"/>
                <Item id="Distance" pid="Distance" dv="No" ivalues="Yes,No" values="Yes,No" fluidAppr="Eulerian" help="Distance"/>
            </Container>
            <Container id="HistoryOutputOnPoints" pid="History output on points" class="Properties" idTemplate="HistoryOutputOnPoints" help="History output on points" open="0"/>
            <Container id="GiDOptions" pid="Options" class="Tab" help="GiD postprocess options" open="0">
                <Item id="GiDPostMode" pid="Result format" dv="Binary" ivalues="Ascii,Binary" values="Ascii,Binary" help="GiD result file format"/>
                <Item id="GiDWriteMeshFlag" pid="Write deformed mesh" dv="Yes" ivalues="Yes,No" values="Yes,No" fluidAppr="Eulerian" help="Write the GiD deformed or undeformed mesh"/>
                <Item id="GiDWriteConditionsFlag" pid="Write conditions" dv="Yes" UseCuts="Yes" ivalues="Yes,No" values="Yes,No" fluidAppr="Eulerian" help="Write the conditions or only element to the GiD result file"/>
                <Item id="GiDWriteParticlesFlag" pid="Write particles" dv="No" ivalues="Yes,No" values="Yes,No" help="Write the particles or only element to the GiD result file"/>
                <Item id="GiDMultiFileFlag" pid="Result file" dv="Single" ivalues="Single,Multiples" values="Single,Multiples" fluidAppr="Eulerian" help="Write one GiD result file or multiple files"/>
            </Container>
            <Container id="CutOptions" pid="Cut planes" class="Properties" UseCuts="No" idTemplate="CutProperties" help="Cut plane postprocess options" open="0"/>
            <Container id="DragOptions" pid="Drag calculation" class="Groups" idTemplate="DragProperties" GiDEntity="point,line,surface" help="Drag calculation properties" open="0"/>
        </Container>
    </RootData>
    <RootData id="PFEM" pid="PFEM" state="hiddenAll" class="application" icon="aplicationTree.gif" help="PFEM" open="1">
        <Container id="AnalysisData" pid="Analysis data" class="Tab" help="Analysis data" open="0">
            <Item id="FluidType" pid="Fluid type" class="fluidType" dv="Incompressible" ivalues="Compressible,Incompressible" values="Compressible,Incompressible" help="Fluid type"/>
            <Item id="FreeSurface" pid="Free surface" class="freeSurf" fluidType="Incompressible" dv="No" ivalues="Yes,No" values="Yes,No" help="Free surface"/>
        </Container>
        <Container id="SolutionStrategy" pid="Solution strategy" help="Solution Strategy" open="0" dv="fh" values="">
            <Container id="ParallelType" pid="Parallel type" class="Tab" help="Parallel type" open="0" icon="groupsTreeNew.gif">
                <Item id="ParallelSolutionType" pid="Parallel type" dv="OpenMP" ivalues="OpenMP,MPI" values="OpenMP,MPI" help=""/>
            </Container>
            <Container id="Advanced" pid="Advanced" fluidType="Incompressible" class="Tab" help="" open="0">
                <Item id="DynamicTau" pid="Use dt in stabilization" dv="0.01" CBState="normal" values="1.0,0.1,0.01,0.001,0.0" help=""/>
                <Item id="OssSwitch" pid="Use orthogonal subscales" dv="0" ivalues="0,1" values="0,1" help=""/>
            </Container>
        </Container>
        <Container id="ProblemParameters" pid="Problem Parameters" help="Problem Parameters" open="0" dv="fh" values="">
            <Item id="StartTime" pid="Start time" dv="0.0" help=""/>
            <Item id="EndTime" pid="End time" dv="1" help=""/>
            <Item id="UseAutomaticDeltaTime" pid="Automatic delta time" class="deltatimetype" dv="Fixed" ivalues="Fixed,Automatic" values="Fixed,Automatic" help="Select the Delta time option to be used"/>
            <Item id="DeltaTime" deltatimetype="Fixed" pid="Delta time" dv="0.001" help=""/>
            <Item id="TargetCFL" pid="Target CFL" deltatimetype="Automatic" dv="5.0" help=""/>
        </Container>
        <Container id="Properties" pid="Properties" class="Properties" idTemplate="PropertiesFluid" icon="propsTreeNew.gif" help="Add a new Property" open="0"/>
        <Container id="Elements" pid="Elements" help="Elements" open="0">
            <Container id="Fluid2D" pid="Fluid" class="Groups" nDim="2D" GiDEntity="surface" idTemplate="Fluid2DElement" icon="groupsTreeNew.gif" help="Fluid" open="0"/>
            <Container id="Fluid3D" pid="Fluid" class="Groups" nDim="3D" GiDEntity="volume" idTemplate="Fluid3DElement" icon="groupsTreeNew.gif" help="Fluid" open="0"/>
        </Container>
        <Container id="Conditions" pid="Boundary conditions" help="Boundary conditions" open="0">
            <Container id="Is-Slip" pid="Is-Slip" class="Groups" idTemplate="IsSlip" GiDEntity="point,line,surface" icon="groupsTreeNew.gif" help="Slip" open="0"/>
            <Container id="Is-Fluid" pid="Is-Fluid" class="Groups" idTemplate="IsSlip" icon="groupsTreeNew.gif" help="Is fluid" open="0"/>
            <Container id="Is-Boundary" pid="Is-Boundary" class="Groups" idTemplate="IsBoundary" icon="groupsTreeNew.gif" help="Is boundary" open="0"/>
        </Container>
        <Container id="Results" pid="Results" help="Results" open="0">
            <Item id="VolumeOutput" pid="Volume output" dv="Yes" nDim="3D" class="UseCuts" ivalues="Yes,No" values="Yes,No" help="Volume output"/>
            <Item id="OutputDeltaTime" pid="Output delta time" dv="0.0" help="Output delata time"/>
            <Item id="PrintInLayer" pid="Print in layer" dv="Yes" ivalues="Yes,No" values="Yes,No" help="Print in layer"/>
            <Container id="OnNodes" pid="On nodes" class="Tab" help="On nodes" open="0">
                <Item id="Velocity" pid="Velocity" dv="Yes" ivalues="Yes,No" values="Yes,No" help="Velocity"/>
                <Item id="Pressure" pid="Pressure" dv="Yes" ivalues="Yes,No" values="Yes,No" help="Pressure"/>
                <Item id="Reactions" pid="Reactions" dv="Yes" ivalues="Yes,No" values="Yes,No" help="Stresses"/>
                <Item id="Distance" pid="Distance" dv="No" ivalues="Yes,No" values="Yes,No" help="Distance"/>
            </Container>
            <Container id="GiDOptions" pid="Options" class="Tab" help="GiD postprocess options" open="0">
                <Item id="GiDPostMode" pid="Result format" dv="Binary" ivalues="Ascii,Binary" values="Ascii,Binary" help="GiD result file format"/>
                <Item id="GiDWriteMeshFlag" pid="Write deformed mesh" dv="Yes" ivalues="Yes,No" values="Yes,No" help="Write the GiD deformed or undeformed mesh"/>
                <Item id="GiDWriteConditionsFlag" pid="Write conditions" dv="No" ivalues="Yes,No" values="Yes,No" help="Write the conditions or only element to the GiD result file"/>
                <Item id="GiDWriteParticlesFlag" pid="Write particles" dv="Yes" ivalues="Yes,No" values="Yes,No" help="Write the particles or only element to the GiD result file"/>
                <Item id="GiDMultiFileFlag" pid="Result file" dv="Single" ivalues="Single,Multiples" values="Single,Multiples" help="Write one GiD result file or multiple files"/>
            </Container>
        </Container>
    </RootData>
    <RootData id="FluidStructureInteraction" pid="Fluid structure interaction (FSI)" state="hiddenAll" class="application" icon="aplicationTree.gif" help="Fluid structure interaction (FSI)" open="0">
        <Container id="NotAvailable" pid="Not available" dv="res" help="Developing in process"/>
    </RootData>
    <RootData id="ConvectionDiffusion" pid="Convection diffusion" state="hiddenAll" class="application" icon="aplicationTree.gif" help="Convection diffusion" open="1">
        <Container id="AnalysisData" pid="Analysis data" class="Tab" state="hidden" help="Analysis data" open="0">
            <Item id="BaseCDType" pid="Base variable type" class="BaseCFType" dv="Temperature" ivalues="Temperature" state="hidden" values="Temperature" help="Base variable type"/>
            <Item id="AnalysisType" pid="Analysis type" dv="Linear" class="CDAnalysisType" ivalues="Linear,Non-Linear" values="Linear,Non-Linear" help="Analysis type"/>
            <Item id="SolutionType" pid="Solution type" class="CD-soluType" dv="Static" ivalues="Static,Dynamic" values="Static,Dynamic" help="Solution type"/>
        </Container>
        <Container id="SolutionStrategy" pid="Solution strategy" help="Solution Strategy" open="0" dv="fh" values="">
            <Container id="ParallelType" pid="Parallel type" class="Tab" help="Parallel type" open="0" icon="groupsTreeNew.gif">
                <Item id="ParallelSolutionType" pid="Parallelization" dv="OpenMP" class="PSolutionType" ivalues="OpenMP" values="OpenMP" delvalues="MPI" help="Parallelization type"/>
                <Item id="MPINumberOfProcessors" pid="Number of processors" dv="2" PSolutionType="MPI" help="Number of processors"/>
                <Item id="OpenMPNumberOfThreads" pid="Number of threads" dv="2" PSolutionType="OpenMP" help="Number of threads"/>
            </Container>
            <Container id="SolverTypes" pid="Linear solver" class="Tab" help="Solver types" open="0" icon="groupsTreeNew.gif">
                <Item id="TemperatureLinearSolverType" pid="Temperature linear solver type" class="CDLinearSolverType" BaseCFType="Temperature" dv="Iterative" ivalues="Direct,Iterative" values="Direct,Iterative" help=""/>
                <Item id="TemperatureDirectSolverType" pid="Temperature direct solver type" CDLinearSolverType="Direct" BaseCFType="Temperature" dv="SuperLU" ivalues="SkylineLUFactorization,SuperLU,ParallelMKLPardiso" values="Skyline LU factorization,Super LU,Parallel MKL Pardiso" help=""/>
                <Item id="TemperatureIterativeSolverType" pid="Temperature iterative solver type" CDLinearSolverType="Iterative" BaseCFType="Temperature" dv="BiConjugateGradientStabilized" ivalues="ConjugateGradient,BiConjugateGradientStabilized,GMRES,AMGCL" values="Conjugate gradient,BiConjugate gradient stabilized,GMRES,AMGCL" help=""/>
                <Item id="TemperatureISTolerance" pid="Temperature solver tolerance" BaseCFType="Temperature" CDLinearSolverType="Iterative" dv="1E-6" help=""/>
                <Item id="TemperatureISMaximumIteration" pid="Temperature solver maximum iteration" BaseCFType="Temperature" CDLinearSolverType="Iterative" dv="5000" help=""/>
                <Item id="TemperaturePreconditionerType" pid="Temperature preconditioner type" CDLinearSolverType="Iterative" BaseCFType="Temperature" dv="ILU0" ivalues="None,Diagonal,ILU0" values="None,Diagonal,ILU0" help=""/>
            </Container>
            <Container id="Advanced" pid="Advanced" BaseCFType="Temperature" class="Tab" help="Advanced Solver Parameters" open="0" icon="groupsTreeNew.gif">
                <Item id="PredictorCorrector" pid="Predictor corrector" BaseCFType="Temperature" dv="False" ivalues="True,False" values="True,False" help=""/>
                <Item id="RelativeTemperatureTolerance" pid="Relative temperature tolerance" BaseCFType="Temperature" dv="1E-3" help="Relative temperature tolerance"/>
                <Item id="MaximumTemperatureIterations" pid="Maximum temperature iterations" BaseCFType="Temperature" dv="15" help=""/>
                <Item id="TimeOrder" pid="Time order" dv="2" BaseCFType="Temperature" ivalues="1,2" values="1,2" help=""/>
            </Container>
            <Container id="ProblemParameters" pid="Problem parameters" CD-soluType="Dynamic" help="Problem parameters" open="0">
                <Item id="StartTime" pid="Start time" dv="0.0" BaseCFType="Temperature" help=""/>
                <Item id="EndTime" pid="End time" dv="1" help=""/>
                <Item id="UseAutomaticDeltaTime" pid="Automatic delta time" BaseCFType="Temperature" class="cddeltatimetype" dv="Fixed" ivalues="Fixed" values="Fixed" delvalues="Automatic" help="Select the Delta time option to be used"/>
                <Item id="DeltaTime" cddeltatimetype="Fixed" pid="Delta time" dv="0.001" help=""/>
            </Container>
        </Container>
        <Container id="Properties" pid="Properties" class="Properties" idTemplate="PropertiesConvectionDiffusion" icon="propsTreeNew.gif" help="Add a new Property" open="0"/>
        <Container id="Elements" pid="Elements" help="Elements" open="0">
            <Container id="ConvDiff2D" pid="Convection-Diffusion" class="Groups" nDim="2D" GiDEntity="surface" BaseCFType="Temperature" idTemplate="ConvDiff2D" icon="groupsTreeNew.gif" help="Convection diffusion element type" open="0"/>
            <Container id="ConvDiff3D" pid="Convection-Diffusion" class="Groups" nDim="3D" GiDEntity="volume" BaseCFType="Temperature" idTemplate="ConvDiff3D" icon="groupsTreeNew.gif" help="Convection diffusion element type" open="0"/>
        </Container>
        <Container id="InitialConditions" pid="Initial conditions" BaseCFType="Temperature" CD-soluType="Dynamic" help="Initial Conditions" open="0">
            <Container id="InitialTemperature" pid="Initial temperature" BaseCFType="Temperature" class="Groups" idTemplate="CDInitialTemperature" icon="groupsTreeNew.gif" help="Initial Conditions" open="0"/>
        </Container>
        <Container id="Conditions" pid="Boundary conditions" help="Boundary Conditions" open="0">
            <Container id="HeatFlux" pid="Heat flux" class="Groups" BaseCFType="Temperature" idTemplate="CDHeatFlux" icon="groupsTreeNew.gif" help="Heat flux" open="0"/>
            <Container id="FaceHeatFlux" pid="Face heat flux" class="Groups" BaseCFType="Temperature" idTemplate="CDFaceHeatFlux" icon="groupsTreeNew.gif" help="Face heat flux" open="0"/>
            <Container id="PrescribedTemperature" pid="Prescribed temperature" class="Groups" BaseCFType="Temperature" idTemplate="CDPrescribedTemperature" icon="groupsTreeNew.gif" help="Prescribed temperature" open="0"/>
        </Container>
        <Container id="Results" pid="Results" help="Results" open="0">
            <Item id="VolumeOutput" pid="Volume output" dv="Yes" nDim="3D" class="UseCuts" ivalues="Yes,No" values="Yes,No" help="Volume output"/>
            <Item id="OutputDeltaTime" pid="Output delta time" CD-soluType="Dynamic" dv="0.1" help="Output delata time"/>
            <Item id="PrintInLayer" pid="Print in layer" state="hidden" dv="Yes" ivalues="Yes,No" values="Yes,No" help="Print in layer"/>
            <Container id="OnNodes" pid="On nodes" class="Tab" help="On nodes" open="0">
                <Item id="Temperature" pid="Temperature" dv="Yes" ivalues="Yes,No" values="Yes,No" help="Temperature"/>
            </Container>
            <Container id="GiDOptions" pid="Options" class="Tab" help="GiD postprocess options" open="0">
                <Item id="GiDPostMode" pid="Result format" dv="Binary" ivalues="Ascii,Binary" values="Ascii,Binary" help="GiD result file format"/>
                <Item id="GiDWriteMeshFlag" pid="Write deformed mesh" dv="Yes" ivalues="True,False" values="Yes,No" fluidAppr="Eulerian" help="Write the GiD deformed or undeformed mesh"/>
                <Item id="GiDWriteConditionsFlag" pid="Write conditions" dv="No" ivalues="True,False" values="Yes,No" fluidAppr="Eulerian" help="Write the conditions or only element to the GiD result file"/>
                <Item id="GiDMultiFileFlag" pid="Result file" dv="Single" ivalues="Single,Multiples" values="Single,Multiples" fluidAppr="Eulerian" help="Write one GiD result file or multiple files"/>
            </Container>
            <Container id="CutOptions" pid="Cut planes" class="Properties" UseCuts="No" idTemplate="CutProperties" help="Cut plane postprocess options" open="0"/>
        </Container>
    </RootData>
    <RootData id="DEM" pid="DEM" state="hiddenAll" class="application" icon="aplicationTree.gif" help="DEM" open="1">
        <Container id="DEM-Options" pid="DEM general options" class="Tab" help="DEM general options" open="0">
            <Container id="TimeStep" pid="Time step" class="Tab">
                <Item id="UseAutomaticDeltaTime" pid="Automatic delta time" class="DEM-deltatimetype" dv="Fixed" ivalues="Fixed,Automatic" values="Fixed,Automatic" help="Select the Delta time option to be used"/>
                <Item id="DeltaTime" DEM-deltatimetype="Fixed" pid="Delta time" dv="0.0001" help=""/>
                <Item id="DeltaTimeSafetyFactor" DEM-deltatimetype="Automatic" pid="Delta time safety factor" dv="1.0" help="Delta time safety factor"/>
            </Container>
            <Item id="DragCorrection" pid="Drag correction" dv="Chien" ivalues="Chien,Hayder" values="Chien,Hayder" help="Select the method used for the drag correction due to sphericity"/>
            <Container id="Boundingbox" pid="Bounding Box" class="Tab">
                <Item id="UseBoundingBox" pid="Active bounding box" dv="Active" class="DEM-BBox" ivalues="Active,NotActive" values="Active,Not active" help="Active bounding box"/>
                <Item id="BoundingBoxType" pid="Bounding box type" DEM-BBox="Active" class="DEM-BBoxType" dv="Automatic" ivalues="Automatic,Fixed" values="Automatic,Fixed" help="Bounding box type"/>
                <Item id="EnlargementFactor" pid="Enlargement factor" DEM-BBox="Active" DEM-BBoxType="Automatic" dv="1.1" help="Enlargement factor"/>
                <Item id="MaxX" pid="Max X" DEM-BBox="Active" DEM-BBoxType="Fixed" dv="100.0" help="Max X"/>
                <Item id="MaxY" pid="Max Y" DEM-BBox="Active" DEM-BBoxType="Fixed" dv="100.0" help="Max Y" sbi="PickCoordinates" sbp="Pick" sbxp="MaxX,MaxY,MaxZ"/>
                <Item id="MaxZ" pid="Max Z" DEM-BBox="Active" DEM-BBoxType="Fixed" dv="100.0" help="Max Z"/>
                <Item id="MinX" pid="Min X" DEM-BBox="Active" DEM-BBoxType="Fixed" dv="-100.0" help="Min X"/>
                <Item id="MinY" pid="Min Y" DEM-BBox="Active" DEM-BBoxType="Fixed" dv="-100.0" help="Min Y" sbi="PickCoordinates" sbp="Pick" sbxp="MinX,MinY,MinZ"/>
                <Item id="MinZ" pid="Min Z" DEM-BBox="Active" DEM-BBoxType="Fixed" dv="-100.0" help="Min Z"/>
            </Container>
        </Container>
        <Container id="Properties" pid="Properties" class="Properties" state="hidden" idTemplate="PropertiesDEM" icon="propsTreeNew.gif" help="Add a new Property" open="0"/>
        <Container id="Conditions" pid="Boundary conditions" help="Boundary conditions" open="0">
            <Container id="DEM-Inlet" pid="Inlet" class="Groups" idTemplate="DEM-InletBC" GiDEntity="line,surface" icon="groupsTreeNew.gif" help="DEM inlet boundary condition" open="0"/>
        </Container>
    </RootData>
    <RootData id="FreeSurfaceFlow" pid="Free surface flow" state="hiddenAll" class="application" icon="aplicationTree.gif" help="Free surface flow" open="1">
        <Container id="SolutionStrategy" pid="Solution strategy" help="Solution Strategy" open="0" dv="fh" values="">
            <Container id="ParallelType" pid="Parallel type" class="Tab" help="Parallel type" open="0" icon="groupsTreeNew.gif">
                <Item id="ParallelSolutionType" pid="Parallelization" dv="OpenMP" class="PSolutionType" ivalues="OpenMP" values="OpenMP" help=""/>
                <Item id="OpenMPNumberOfThreads" pid="Number of threads" dv="2" PSolutionType="OpenMP" help="Number of threads"/>
            </Container>
            <Container id="Advanced" pid="Advanced" class="Tab" help="Advanced solver parameters" open="0" icon="groupsTreeNew.gif">
                <Item id="DynamicTau" pid="Use dt in stabilization" dv="0.01" CBState="normal" values="1.0,0.1,0.01,0.001,0.0" help=""/>
                <Item id="OssSwitch" pid="Use orthogonal subscales" dv="1" ivalues="0,1" values="0,1" help=""/>
                <Item id="UseMassCorrection" pid="Use mass correction" dv="Yes" ivalues="Yes,No" values="Yes,No" help=""/>
                <Item id="EdgeDetectionAngle" pid="Edge detection angle" dv="45.0" help="Edge detection angle"/>
                <Item id="UseConstantPressure" pid="Assume constant pressure" dv="No" ivalues="Yes,No" values="Yes,No" help="Assume constant pressure"/>
                <Item id="RedistanceFrequency" pid="Redistance frequency" dv="5" help="Redistance frequency"/>
                <Item id="ExtrapolationLayers" pid="Extrapolation layers" dv="5" help="Extrapolation layers"/>
                <Item id="StabdtPressureFactor" pid="Stabilized dt pressure factor" dv="1.0" help="Stabilized dt pressure factor"/>
                <Item id="StabdtConvectionFactor" pid="Stabilized convection factor" dv="0.01" help="Stabilized convection factor"/>
                <Item id="ReductionOnFailure" pid="Reduction on failure" dv="0.3" help="Reduction on failure"/>
                <Item id="WallRoughness" pid="Wall roughness" dv="0.0" help="Wall roughness"/>
            </Container>
            <Container id="LevelSetBodyForce" pid="Body force" help="Body forces" class="Tab" open="0">
                <Item id="GravityValue" pid="Gravity value" dv="9.8" help="Gravity value"/>
                <Item id="Cx" pid="Cx" dv="0.0" help="X Vector"/>
                <Item id="Cy" pid="Cy" dv="0.0" help="Y Vector"/>
                <Item id="Cz" pid="Cz" dv="-1.0" nDim="3D" help="Z Vector"/>
            </Container>
            <Container id="PorousZones" pid="Porous zones" help="Porous zones" open="0">
                <Item id="UseErgunEquation" pid="Use Ergun equation" dv="No" class="ErgunEquationType" ivalues="Yes,No" values="Yes,No" help="Use Ergun equation"/>
                <Container id="ErgunEquationNo" pid="Zones" class="Groups" ErgunEquationType="No" nDim="3D" GiDEntity="line,surface,volume" idTemplate="PorosityDarcy" icon="groupsTreeNew.gif" help="" open="0"/>
                <Container id="ErgunEquationYes" pid="Zones" class="Groups" ErgunEquationType="Yes" nDim="3D" GiDEntity="line,surface,volume" idTemplate="PorosityDiameter" icon="groupsTreeNew.gif" help="" open="0"/>
            </Container>
        </Container>
        <Container id="ProblemParameters" pid="Problem parameters" help="Problem parameters" open="0">
            <Item id="StartTime" pid="Start time" dv="0.0" help="Start time"/>
            <Item id="EndTime" pid="End time" dv="10.0" help="End time"/>
            <Item id="MaxTimeStep" pid="Max time step" dv="0.001" help="Max time step"/>
            <Item id="SafetyFactor" pid="CFL safety factor" dv="0.5" help="Safety factor"/>
            <Item id="DivergenceCleareanceStep" pid="Divergence cleareance step" dv="10" help="Define the divergence cleareance step value"/>
            <Item id="InitialTimeStep" pid="Initial time step" dv="0.00001" help="Initial time step"/>
        </Container>
        <Container id="FSF-Material" pid="Fluid material" class="Tab" icon="propsTreeNew.gif" help="Select material" open="0">
            <Item id="Material" pid="Material" dv="" GCV="Materials" help="Material"/>
        </Container>
        <Container id="Elements" pid="Elements" help="Elements" open="0">
            <Container id="LevelSetFluid2D" pid="Fluid" class="Groups" nDim="2D" GiDEntity="surface" idTemplate="NoFluid2DElement" icon="groupsTreeNew.gif" help="Fluid" open="0"/>
            <Container id="LevelSetFluid3D" pid="Fluid" class="Groups" nDim="3D" GiDEntity="volume" idTemplate="NoFluid3DElement" icon="groupsTreeNew.gif" help="Fluid" open="0"/>
            <Container id="LevelSetNoFluid2D" pid="No fluid" class="Groups" nDim="2D" GiDEntity="surface" idTemplate="NoFluid2DElement" icon="groupsTreeNew.gif" help="Fluid" open="0"/>
            <Container id="LevelSetNoFluid3D" pid="No fluid" class="Groups" nDim="3D" GiDEntity="volume" idTemplate="NoFluid3DElement" icon="groupsTreeNew.gif" help="Fluid" open="0"/>
        </Container>
        <Container id="Conditions" pid="Boundary conditions" help="Boundary Conditions" open="0">
            <Container id="InletVelocity" pid="Inlet velocity" class="Groups" idTemplate="InletVelocity" icon="groupsTreeNew.gif" help="Inlet velocity" open="0"/>
            <Container id="OutletPressure" pid="Outlet pressure" idTemplate="OutletPressure" class="Groups" GiDEntity="point,line,surface" icon="groupsTreeNew.gif" help="Outlet pressure" open="0"/>
            <Container id="Is-Slip" pid="Slip wall" class="Groups" idTemplate="IsSlip" GiDEntity="point,line,surface" icon="groupsTreeNew.gif" help="Slip" open="0"/>
        </Container>
        <Container id="Results" pid="Results" help="Results" open="0">
            <Item id="OutputDeltaTime" pid="Output delta time" dv="0.1" help="Output delta time"/>
            <Item id="GiDMultiFileFlag" pid="Result file" class="FSF-GiDFileFlag" dv="Single" ivalues="Single,Multiples" values="Single,Multiples" help="Write one GiD result file or multiple files"/>
            <Item id="PrintInLayer" pid="Print in layer" FSF-GiDFileFlag="Multiples" dv="No" ivalues="Yes,No" values="Yes,No" help="Print in layer"/>
            <Container id="OnNodes" pid="On nodes" class="Tab" help="On nodes" open="0" state="hiddenAll">
                <Item id="Velocity" pid="Velocity" dv="Yes" ivalues="Yes,No" values="Yes,No" help="Velocity"/>
                <Item id="Pressure" pid="Pressure" dv="Yes" ivalues="Yes,No" values="Yes,No" help="Pressure"/>
                <Item id="Distance" pid="Distance" dv="No" ivalues="Yes,No" values="Yes,No" help="Distance"/>
                <Item id="PressureGradient" pid="Pressure gradient" dv="No" ivalues="Yes,No" values="Yes,No" help="Pressure gradient"/>
                <Item id="Porosity" pid="Porosity" dv="No" ivalues="Yes,No" values="Yes,No" help="Porosity"/>
                <Item id="LinearDarcyCoeff" pid="Linear Darcy coefficient" dv="No" ivalues="Yes,No" values="Yes,No" help="Linear Darcy coefficient"/>
                <Item id="NonLinearDarcyCoeff" pid="Nonlinear Darcy coefficient" dv="No" ivalues="Yes,No" values="Yes,No" help="Nonlinear Darcy coefficient"/>
            </Container>
        </Container>
    </RootData>
    <RootData id="Curves" pid="Curves" state="hiddenAll" class="Curves" icon="arc.gif" help="Curve definition" open="1"/>
    <Templates>
        <Template id="Solid2DElement" icon="groupsTree.gif" help="2D element">
            <Container id="Properties" pid="Element Properties" state="hidden" help="Properties">
                <Item id="ElementType" pid="Element type" dv="Triangle" ivalues="Triangle,Quadrilateral" values="Triangle,Quadrilateral" help="Element Type"/>
                <Item id="Property" pid="Property" dv="" GCV="Properties" help="Property"/>
            </Container>
        </Template>
        <Template id="ShellElement" icon="groupsTree.gif" help="Isotropic shell formulation">
            <Container id="Properties" pid="Element Properties" state="hidden" help="Properties">
                <Item id="ElementType" pid="Element type" dv="Triangle" ivalues="Triangle,Quadrilateral" values="Triangle,Quadrilateral" help="Element Type"/>
                <Item id="Property" pid="Property" dv="" GCV="Properties" help="Property"/>
            </Container>
        </Template>
        <Template id="ShellElementT" icon="groupsTree.gif" help="Thin shell formulation">
            <Container id="Properties" pid="Element Properties" state="hidden" help="Properties">
                <Item id="ElementType" pid="Element type" dv="Triangle" ivalues="Triangle" values="Triangle" help="Element Type"/>
                <Item id="Property" pid="Property" dv="" GCV="Properties" help="Property"/>
            </Container>
        </Template>
        <Template id="ShellElementQ" icon="groupsTree.gif" help="Thick shell formulation">
            <Container id="Properties" pid="Element Properties" state="hidden" help="Properties">
                <Item id="ElementType" pid="Element type" dv="Quadrilateral" ivalues="Quadrilateral" values="Quadrilateral" help="Element Type"/>
                <Item id="Property" pid="Property" dv="" GCV="Properties" help="Property"/>
            </Container>
        </Template>
        <Template id="Trusselement" icon="groupsTree.gif" help="Total Lagrangian">
            <Container id="Properties" pid="Element Properties" state="hidden" help="Properties">
                <Item id="ElementType" pid="Element type" dv="Linear" ivalues="Linear" values="Linear" help="Element Type"/>
                <Item id="Property" pid="Property" dv="" GCV="Properties" help="Property"/>
            </Container>
        </Template>
        <Template id="BeamElement" icon="groupsTree.gif" help="Beam total Lagrangian">
            <Container id="Properties" pid="Element Properties" state="hidden" help="Properties">
                <Item id="ElementType" pid="Element type" dv="Linear" ivalues="Linear" values="Linear" help="Element Type"/>
                <Item id="Property" pid="Property" dv="" GCV="Properties" help="Property"/>
            </Container>
        </Template>
        <Template id="Solid3DElement" icon="groupsTree.gif" help="Total Lagrangian">
            <Container id="Properties" pid="Element Properties" state="hidden" help="Properties">
                <Item id="ElementType" pid="Element type" dv="Tetrahedra" ivalues="Tetrahedra,Hexahedra" values="Tetrahedra,Hexahedra" help="Element Type"/>
                <Item id="Property" pid="Property" dv="" GCV="Properties" help="Property"/>
            </Container>
        </Template>
        <Template id="MembraneElement" icon="groupsTree.gif" help="Membrane element">
            <Container id="Properties" pid="Element Properties" state="hidden" help="Properties">
                <Item id="ElementType" pid="Element type" dv="Triangle" ivalues="Triangle" values="Triangle" help="Element Type"/>
                <Item id="Property" pid="Property" dv="" GCV="Properties" help="Property"/>
            </Container>
        </Template>
        <Template id="Fluid2DElement" icon="groupsTree.gif" help="Fluid 2D Element">
            <Container id="Properties" pid="Element Properties" state="hidden" help="Properties">
                <Item id="ElementType" pid="Element type" dv="Triangle" ivalues="Triangle" values="Triangle" help="Element Type"/>
                <Item id="Property" pid="Property" dv="" GCV="Properties" help="Property"/>
            </Container>
        </Template>
        <Template id="Fluid3DElement" icon="groupsTree.gif" help="Fluid 3D Element">
            <Container id="Properties" pid="Element Properties" state="hidden" help="Properties">
                <Item id="ElementType" pid="Element type" dv="Tetrahedra" ivalues="Tetrahedra" values="Tetrahedra" help="Element Type"/>
                <Item id="Property" pid="Property" dv="" GCV="Properties" help="Property"/>
            </Container>
        </Template>
        <Template id="NoFluid2DElement" icon="groupsTree.gif" help="Fluid 2D Element">
            <Container id="Properties" pid="Element Properties" state="hidden" help="Properties">
                <Item id="ElementType" pid="Element type" dv="Triangle" ivalues="Triangle" values="Triangle" help="Element Type"/>
            </Container>
        </Template>
        <Template id="NoFluid3DElement" icon="groupsTree.gif" help="Fluid 3D Element">
            <Container id="Properties" pid="Element Properties" state="hidden" help="Properties">
                <Item id="ElementType" pid="Element type" dv="Tetrahedra" ivalues="Tetrahedra" values="Tetrahedra" help="Element Type"/>
            </Container>
        </Template>
        <Template id="Displacements" icon="groupsTree.gif" help="Activation">
            <Container id="Values" pid="Values" help="Set the values">
                <Item id="Vx" pid="X" dv="0.0" help="X coordinate"/>
                <Item id="Vy" pid="Y" dv="0.0" help="Y coordinate"/>
                <Item id="Vz" pid="Z" dv="0.0" nDim="3D" help="Z coordinate"/>
            </Container>
            <Container id="Activation" pid="Fixed" help="Fix/release some degree of freedom">
                <Item id="Ax" pid="X active" dv="1" ivalues="1,0" values="1,0" help="Fix X degree of freedom"/>
                <Item id="Ay" pid="Y active" dv="1" ivalues="1,0" values="1,0" help="Fix Y degree of freedom"/>
                <Item id="Az" pid="Z active" dv="0" nDim="3D" ivalues="1,0" values="1,0" help="Fix Z degree of freedom"/>
            </Container>
        </Template>
        <Template id="InletVelocity" icon="groupsTree.gif" help="Inlet velocity">
            <Container id="Values" pid="Values" help="Values">
                <Item id="Vx" pid="X" dv="0.0" help="X velocity"/>
                <Item id="Vy" pid="Y" dv="0.0" help="Y velocity"/>
                <Item id="Vz" pid="Z" dv="0.0" nDim="3D" help="Z velocity"/>
            </Container>
            <Container id="Activation" pid="Fixity" help="Fixity">
                <Item id="Ax" pid="X active" dv="1" ivalues="1,0" values="1,0" help="Fix X velocity"/>
                <Item id="Ay" pid="Y active" dv="1" ivalues="1,0" values="1,0" help="Fix Y velocity"/>
                <Item id="Az" pid="Z active" dv="0" nDim="3D" ivalues="1,0" values="1,0" help="Fix Z velocity"/>
            </Container>
        </Template>
        <Template id="NoSlip" icon="groupsTree.gif" help="No Slip">
            <Container id="Values" pid="Values" help="Values">
                <Item id="Vx" pid="X" dv="0.0" help="X velocity"/>
                <Item id="Vy" pid="Y" dv="0.0" help="Y velocity"/>
                <Item id="Vz" pid="Z" dv="0.0" nDim="3D" help="Z velocity"/>
            </Container>
            <Container id="Activation" pid="Fixity" help="Fixity">
                <Item id="Ax" pid="X active" dv="1" ivalues="1,0" values="1,0" help="Fix X velocity"/>
                <Item id="Ay" pid="Y active" dv="1" ivalues="1,0" values="1,0" help="Fix Y velocity"/>
                <Item id="Az" pid="Z active" dv="0" nDim="3D" ivalues="1,0" values="1,0" help="Fix Z velocity"/>
            </Container>
        </Template>
        <Template id="PFEMwall" icon="groupsTree.gif" help="PFEM Wall">
            <Container id="LinearVelocity" pid="Linear Velocity" help="Linear Velocity">
                <Item id="LVx" pid="X" dv="0.0" help="X velocity"/>
                <Item id="LVy" pid="Y" dv="0.0" help="Y velocity"/>
                <Item id="LVz" pid="Z" dv="0.0" nDim="3D" help="Z velocity"/>
                <Item id="LPeriodAct" pid="Period. Activ." dv="0" ivalues="1,0" values="1,0" help="Z velocity"/>
                <Item id="LPeriod" pid="Periode" dv="0" help="Periodic"/>
            </Container>
            <Container id="AngularVelocity" pid="Angular Velocity" help="Angular Velocity">
                <Item id="AVx" pid="X" dv="0.0" help="X velocity"/>
                <Item id="AVy" pid="Y" dv="0.0" help="Y velocity"/>
                <Item id="AVz" pid="Z" dv="0.0" nDim="3D" help="Z velocity"/>
                <Item id="APeriodAct" pid="Period. Activ." dv="0" ivalues="1,0" values="1,0" help="Z velocity"/>
                <Item id="APeriod" pid="Periode" dv="0" help="Periodic"/>
            </Container>
            <Container id="RotationCenter" pid="Rotation Center" help="Rotation Center">
                <Item id="Gx" pid="X" dv="0.0" help="X velocity"/>
                <Item id="Gy" pid="Y" dv="0.0" help="Y velocity" sbi="PickCoordinates" sbp="Pick" sbxp="Gx,Gy,Gz"/>
                <Item id="Gz" pid="Z" dv="0.0" nDim="3D" help="Z velocity"/>
            </Container>
        </Template>
        <Template id="PFEMFixedWall" icon="groupsTree.gif" help="PFEM Fixed Wall">
            <Container id="Displacement" pid="Displacement" help="Displacement">
                <Item id="Dx" pid="X" dv="0.0" help="X displacement"/>
                <Item id="Dy" pid="Y" dv="0.0" help="Y displacement"/>
                <Item id="Dz" pid="Z" dv="0.0" nDim="3D" help="Z displacement"/>
            </Container>
        </Template>
        <Template id="PFEMFluidInlet" icon="groupsTree.gif" help="Activation">
            <Container id="Values" pid="Velocity" help="Values">
                <Item id="Vx" pid="X" dv="0.0" help="X velocity"/>
                <Item id="Vy" pid="Y" dv="0.0" help="Y velocity"/>
                <Item id="Vz" pid="Z" dv="0.0" nDim="3D" help="Z velocity"/>
            </Container>
            <Container id="Activation" pid="Fixity" help="Fixity">
                <Item id="Ax" pid="X active" dv="1" ivalues="1,0" values="1,0" help="Fix X velocity"/>
                <Item id="Ay" pid="Y active" dv="1" ivalues="1,0" values="1,0" help="Fix Y velocity"/>
                <Item id="Az" pid="Z active" dv="0" nDim="3D" ivalues="1,0" values="1,0" help="Fix Z velocity"/>
            </Container>
        </Template>
        <Template id="Boundingbox" help="Boundingbox">
            <Item id="MaxX" pid="Max X" dv="0.0" help="Max X"/>
            <Item id="MaxY" pid="Max Y" dv="0.0" help="Max Y" sbi="PickCoordinates" sbp="Pick" sbxp="MaxX,MaxY,MaxZ"/>
            <Item id="MaxZ" pid="Max Z" dv="0.0" help="Max Z"/>
            <Item id="MinX" pid="Min X" dv="0.0" help="Min X"/>
            <Item id="MinY" pid="Min Y" dv="0.0" help="Min Y" sbi="PickCoordinates" sbp="Pick" sbxp="MinX,MinY,MinZ"/>
            <Item id="MinZ" pid="Min Z" dv="0.0" help="Min Z"/>
        </Template>
        <Template id="DEM-InletBC" help="DEM inlet boundary condition">
            <Container id="MainProperties" pid="New property" state="hidden" help="Values">
                <Item id="VelocityModulus" pid="Velocity modulus" dv="1.0" help="Velocity modulus of the particles"/>
                <Item id="NumberOfParticles" pid="Number of particles" dv="200.0" help="Number of particles per square meter and second"/>
                <Item id="DirectionVectorX" pid="Direction vector X" dv="0.0" help="Direction vector X"/>
                <Item id="DirectionVectorY" pid="Direction vector Y" dv="0.0" help="Direction vector Y"/>
                <Item id="DirectionVectorZ" pid="Direction vector Z" dv="1.0" help="Direction vector Z"/>
                <Item id="InletStartTime" pid="Inlet start time" dv="0.0" help="Inlet start time"/>
                <Item id="InletStopTime" pid="Inlet stop time" dv="1000.0" help="Inlet stop time"/>
                <Item id="MatModel" pid="Material model" dv="" GCV="MatModel" help="Material model" state="hidden"/>
                <Item id="Material" pid="Material" dv="" GCV="Materials" help="Material"/>
                <Item id="ExcludeBoundaries" pid="Exclude boundaries" dv="No" ivalues="Yes,No" values="Yes,No" help="Exclude boundaries"/>
            </Container>
        </Template>
        <Template id="ConvDiff2D" icon="groupsTree.gif" help="Convection diffusion 2D element type">
            <Container id="Properties" pid="ConvDiff2D" state="hidden" help="Properties">
                <Item id="ElementType" pid="Element type" dv="Triangle" ivalues="Triangle,Quadrilateral" values="Triangle,Quadrilateral" help="Element Type"/>
                <Item id="Property" pid="Property" dv="" GCV="Properties" help="Property"/>
            </Container>
        </Template>
        <Template id="ConvDiff3D" icon="groupsTree.gif" help="Convection diffusion 2D element type">
            <Container id="Properties" pid="ConvDiff3D" state="hidden" help="Properties">
                <Item id="ElementType" pid="Element type" dv="Tetrahedra" ivalues="Tetrahedra,Hexahedra" values="Tetrahedra,Hexahedra" help="Element Type"/>
                <Item id="Property" pid="Property" dv="" GCV="Properties" help="Property"/>
            </Container>
        </Template>
        <Template id="PrescribedVelocity" icon="groupsTree.gif" help="Activation">
            <Container id="Activation" pid="Fix" help="Fix coordinates">
                <Item id="Ax" pid="X fix" dv="1" ivalues="1,0" values="1,0" help="X coordinate"/>
                <Item id="Ay" pid="Y fix" dv="1" ivalues="1,0" values="1,0" help="Y coordinate"/>
                <Item id="Az" pid="Z fix" dv="0" nDim="3D" ivalues="1,0" values="1,0" help="Z coordinate"/>
            </Container>
            <Container id="Values" pid="Values" help="Values">
                <Item id="Vx" pid="X" dv="0.0" help="X Velocity"/>
                <Item id="Vy" pid="Y" dv="0.0" help="Y Velocity"/>
                <Item id="Vz" pid="Z" dv="0.0" nDim="3D" help="Z Velocity"/>
            </Container>
        </Template>
        <Template id="PropertiesStruct" icon="propsTree.gif" help="Property">
            <Container id="MainProperties" pid="New property" state="hidden" help="Values">
                <Item id="ElemType" pid="Property type" dv="" state="normal" ivalues="Beam,Shell,Membrane,Solid" values="Beam,Shell,Membrane,Solid" help="Element type"/>
                <Item id="MatModel" pid="Constitutive law" state="normal" dv="Elastic-Isotropic" GCV="MatModel" help="Material model"/>
                <Item id="Material" pid="Material" dv="" state="normal" GCV="Materials" help="Material"/>
                <Item id="Thickness" pid="Thickness" state="normal" dv="1.0" help="Thickness"/>
                <Item id="SectionType" pid="Section type" state="normal" dv="UserDefined" GCV="SectType" help="Select the section type"/>
                <Item id="ProfileDB" pid="Profile list" state="normal" dv="" GCV="ProfileType" help="Select the profile from the list"/>
                <Item id="Area" pid="Area" dv="1.0" state="normal" help="Cross section area"/>
                <Item id="InertiaIx" pid="Inertia Ix" state="normal" dv="1.0" help="Moment of inertia Ix"/>
                <Item id="InertiaIy" pid="Inertia Iy" state="normal" dv="1.0" help="Moment of inertia Iy"/>
                <Item id="RectangularHeight" pid="Height" state="normal" dv="1.0" help="Height value"/>
                <Item id="RectangularWidth" pid="Width" state="normal" dv="1.0" help="Width value"/>
                <Item id="CircularDiameter" pid="Diameter" state="normal" dv="1.0" help="Diameter value"/>
            </Container>
        </Template>
        <Template id="PropertiesFluid" icon="propsTree.gif" help="Property">
            <Container id="MainProperties" pid="New property" state="hidden" help="Values">
                <Item id="ElemType" pid="Property type" dv="" GCV="ElemType" help="Element type" state="hidden"/>
                <Item id="MatModel" pid="Material model" dv="" GCV="MatModel" help="Material model" state="hidden"/>
                <Item id="Material" pid="Material" dv="" GCV="Materials" help="Material"/>
                <Item id="Thickness" pid="Thickness" dv="1.0" help="Thickness" state="hidden"/>
            </Container>
        </Template>
        <Template id="PropertiesDEM" icon="propsTree.gif" help="Property">
            <Container id="MainProperties" pid="New property" state="hidden" help="Values">
                <Item id="MatModel" pid="Material model" dv="" GCV="MatModel" help="Material model" state="hidden"/>
                <Item id="Material" pid="Material" dv="" GCV="Materials" help="Material"/>
            </Container>
        </Template>
        <Template id="PropertiesConvectionDiffusion" icon="propsTree.gif" help="Property">
            <Container id="MainProperties" pid="New property" state="hidden" help="Values">
                <Item id="MatModel" pid="Material model" dv="" GCV="MatModel" help="Material model" state="hidden"/>
                <Item id="Material" pid="Material" dv="" GCV="Materials" help="Material"/>
            </Container>
        </Template>
        <Template id="CDPrescribedTemperature" icon="groupsTree.gif" help="Activation">
            <Container id="Activation" pid="Fix" help="Fix value">
                <Item id="APTemperature" pid="Temperature fix" dv="1" ivalues="1,0" values="1,0" help="Fix the temperature value"/>
            </Container>
            <Container id="Values" pid="Value" help="Value">
                <Item id="VPTemperature" pid="Temperature" dv="0.0" help="Temperature value"/>
            </Container>
        </Template>
        <Template id="CDHeatFlux" icon="groupsTree.gif" help="Heat flux">
            <Container id="MainProperties" pid="Heat flux" state="hidden" help="Heat flux">
                <Item id="VHeatFlux" pid="Heat flux" dv="0.0" help="Heat flux value"/>
            </Container>
        </Template>
        <Template id="CDFaceHeatFlux" icon="groupsTree.gif" help="Face heat flux">
            <Container id="MainProperties" pid="Face heat flux" state="hidden" help="Face heat flux">
                <Item id="VFaceHeatFlux" pid="Face heat flux" dv="0.0" help="Face heat flux value"/>
                <Item id="VEmissivity" pid="Emissivity" dv="0.0" help="Emissivity value"/>
                <Item id="EnvironmentTemperature" pid="Environment temperature" dv="0.0" help="Environment temperature"/>
                <Item id="VConvectionCoefficient" pid="Convection coefficient" dv="0.0" help="Convection coefficient"/>
            </Container>
        </Template>
        <Template id="BodyForce" icon="groupsTree.gif" help="BodyForce">
            <Container id="MainProperties" pid="Body force" state="hidden" help="Values">
                <Item id="GravityValue" pid="Gravity value" dv="9.8" help="Gravity value"/>
                <Item id="Cx" pid="Cx" dv="0.0" help="X Vector"/>
                <Item id="Cy" pid="Cy" dv="0.0" help="Y Vector"/>
                <Item id="Cz" pid="Cz" dv="-1.0" nDim="3D" help="Z Vector"/>
            </Container>
        </Template>
        <Template id="PointLoad" icon="groupsTree.gif" help="Point Load">
            <Container id="MainProperties" pid="Point Load" state="hidden" help="Values">
                <Item id="Fx" pid="Fx" dv="0.0" functionDissable="0" help="Fx Vector"/>
                <Item id="Fy" pid="Fy" dv="0.0" functionDissable="0" help="Fy Vector"/>
                <Item id="Fz" pid="Fz" dv="0.0" functionDissable="0" nDim="3D" help="Fz Vector"/>
                <Item id="Mx" pid="Mx" dv="0.0" state="hidden" help="Mx Vector"/>
                <Item id="My" pid="My" dv="0.0" state="hidden" help="My Vector"/>
                <Item id="Mz" pid="Mz" dv="0.0" state="hidden" nDim="3D" help="Mz Vector"/>
            </Container>
        </Template>
        <Template id="PointMoment" icon="groupsTree.gif" help="Point Moment">
            <Container id="MainProperties" pid="Point Moment" state="hidden" help="Values" open="0">
                <Item id="Fx" pid="Fx" dv="0.0" state="hidden" help="Fx Vector"/>
                <Item id="Fy" pid="Fy" dv="0.0" state="hidden" help="Fy Vector"/>
                <Item id="Fz" pid="Fz" dv="0.0" state="hidden" help="Fz Vector"/>
                <Item id="Mx" pid="Mx" dv="0.0" nDim="3D" help="Mx Vector"/>
                <Item id="My" pid="My" dv="0.0" nDim="3D" help="My Vector"/>
                <Item id="Mz" pid="Mz" dv="0.0" help="Mz Vector"/>
            </Container>
        </Template>
        <Template id="LineLoad" icon="groupsTree.gif" help="Line Load">
            <Container id="MainProperties" pid="BeamDistributedLoad" state="hidden" help="Line load values">
                <Item id="LineDFx" pid="Fx" dv="0.0" functionDissable="0" help="Line Load global Fx value"/>
                <Item id="LineDFy" pid="Fy" dv="0.0" functionDissable="0" help="Line Load global Fy value"/>
                <Item id="LineDFz" pid="Fz" dv="0.0" functionDissable="0" nDim="3D" help="Line Load global Fz value"/>
            </Container>
        </Template>
        <Template id="LinePressure" icon="groupsTree.gif" help="Define the positive or negative line pressure">
            <Container id="MainProperties" pid="New property" state="hidden" help="Line pressure values">
                <Item id="FixPressure" pid="Fix pressure" dv="1" ivalues="1,0" values="1,0" help="Fix pressure"/>
                <Item id="PressureType" pid="Face type" dv="Positive" ivalues="Positive,Negative" values="Positive,Negative" help="Defines which side of the face that matches the direction of the normal to the surface, positive or negative"/>
                <Item id="PressureValue" pid="Pressure value" dv="0.0" help="Pressure value"/>
            </Container>
        </Template>
        <Template id="OutletPressure" icon="groupsTree.gif" help="Outlet pressure">
            <Container id="MainProperties" pid="New property" state="hidden" help="Values">
                <Item id="FixPressure" pid="Fix pressure" dv="1" ivalues="1,0" values="1,0" help="Fix pressure"/>
                <Item id="PressureValue" pid="Pressure value" fluidsolvtyp="ElementBased,Monolithic,EdgeBased,LevelSet" dv="0.0" help="Pressure value"/>
            </Container>
        </Template>
        <Template id="FacePressure" icon="groupsTree.gif" help="Define the positive or negative face pressure">
            <Container id="MainProperties" pid="New property" state="hidden" help="Values">
                <Item id="FixPressure" pid="Fix pressure" dv="1" ivalues="1,0" values="1,0" help="Fix pressure"/>
                <Item id="PressureType" pid="Face type" dv="Positive" ivalues="Positive,Negative" values="Positive,Negative" help="Defines which side of the face that matches the direction of the normal to the surface, positive or negative"/>
                <Item id="PressureValue" pid="Pressure value" dv="0.0" help="Pressure value"/>
            </Container>
        </Template>
        <Template id="FaceLoad" icon="groupsTree.gif" help="Face Force">
            <Container id="MainProperties" pid="Face" state="hidden" help="Values">
                <Item id="SurfaceDFx" pid="Fx" dv="0.0" functionDissable="0" help="Fx Vector"/>
                <Item id="SurfaceDFy" pid="Fy" dv="0.0" functionDissable="0" help="Fy Vector"/>
                <Item id="SurfaceDFz" pid="Fz" dv="0.0" functionDissable="0" nDim="3D" help="Fz Vector"/>
            </Container>
        </Template>
        <Template id="InitialVelocity" icon="groupsTree.gif" help="Initial velocity">
            <Container id="Values" pid="Values" help="Values">
                <Item id="Vx" pid="Vx" dv="0.0" help="X initial velocity"/>
                <Item id="Vy" pid="Vy" dv="0.0" help="Y initial velocity"/>
                <Item id="Vz" pid="Vz" dv="0.0" nDim="3D" help="Z initial velocity"/>
            </Container>
        </Template>
        <Template id="InitialTemperature" icon="groupsTree.gif" help="Initial temperature">
            <Container id="MainProperties" pid="New property" state="hidden" help="Values">
                <Item id="InitialTemperature" pid="Temperature" dv="0.0" help=""/>
            </Container>
        </Template>
        <Template id="CDInitialTemperature" icon="groupsTree.gif" help="Initial temperature">
            <Container id="MainProperties" pid="New property" state="hidden" help="Values">
                <Item id="InitialTemperature" pid="Temperature" dv="298.0" help=""/>
            </Container>
        </Template>
        <Template id="InitialPressure" icon="groupsTree.gif" help="Initial pressure">
            <Container id="MainProperties" pid="New property" state="hidden" help="Values">
                <Item id="InitialPressure" pid="Pressure" dv="0.0" help=""/>
            </Container>
        </Template>
        <Template id="FlagVariable" icon="groupsTree.gif" help="Flag variable">
            <Container id="MainProperties" pid="New property" state="hidden" help="Values">
                <Item id="Flag" pid="Flag" dv="1" ivalues="1,2" values="1,2" help="Select the flag value"/>
            </Container>
        </Template>
        <Template id="IsSlip" icon="groupsTree.gif" help="Is-Slip conditional data">
            <Container id="MainProperties" pid="New property" state="hidden" help="Values">
                <Item id="Activate" state="hidden" pid="Activate" dv="1" ivalues="1,0" values="1,0" help="Select the activate option value"/>
                <Item id="ConstantValue" state="hidden" pid="Wall law value" dv="0.0" help="Define the value"/>
            </Container>
        </Template>
        <Template id="IsBoundary" icon="groupsTree.gif" help="Is-boundary conditional data">
            <Container id="MainProperties" pid="New property" state="hidden" help="Values">
                <Item id="Activate" pid="Activate" dv="1" ivalues="1,0" values="1,0" help="Select the activate option value"/>
            </Container>
        </Template>
        <Template id="TurbulenceGroupId" icon="groupsTree.gif" help="">
            <Container id="MainProperties" pid="New group" state="hidden" help="Values">
                <Item id="Activate" pid="Activate" dv="1" ivalues="1,0" values="1,0" help="Select the activate option value"/>
            </Container>
        </Template>
        <Template id="WallLaw" icon="groupsTree.gif" help="Wall law nodal data">
            <Container id="MainProperties" pid="New property" state="hidden" help="Values">
                <Item id="Activate" state="hidden" pid="Activate" dv="1" ivalues="1,0" values="1,0" help="Select the activate option value"/>
                <Item id="ConstantValue" pid="Wall law value" dv="0.0" help="Define the wall_y value"/>
            </Container>
        </Template>
        <Template id="LevelSetDistance" icon="groupsTree.gif" help="Level set distance data">
            <Container id="MainProperties" pid="New property" state="hidden" help="Values">
                <Item id="DistanceValue" pid="Value" dv="-1e-5" help="Define the value"/>
            </Container>
        </Template>
        <Template id="PorosityDiameter" icon="groupsTree.gif" help="Porosity and diameter data">
            <Container id="MainProperties" pid="New property" state="hidden" help="Values">
                <Item id="PorosityValue" pid="Porosity" dv="0.5" help="Define the porosity value"/>
                <Item id="DiameterValue" pid="Diameter" dv="0.03" help="Define the diameter value"/>
            </Container>
        </Template>
        <Template id="PorosityDarcy" icon="groupsTree.gif" help="Porosity and darcy law data">
            <Container id="MainProperties" pid="New property" state="hidden" help="Values">
                <Item id="PorosityValue" pid="Porosity" dv="0.5" help="Define the porosity value"/>
                <Item id="LinearDarcyCoefficient" pid="Linear Darcy coefficient" dv="0.65" help="Define the linear Darcy coefficient value"/>
                <Item id="NonLinearDarcyCoefficient" pid="Nonlinear Darcy coefficient" dv="446.51" help="Define the nonlinear Darcy coefficient value"/>
            </Container>
        </Template>
        <Template id="CutProperties" icon="cutplane.gif" help="Cut properties">
            <Container id="Origin" pid="Origin" help="Origin properties">
                <Item id="OX" pid="X" dv="0.0" help="X coordinate"/>
                <Item id="OY" pid="Y" dv="0.0" help="Y coordinate" sbi="PickCoordinates" sbp="Pick" sbxp="OX,OY,OZ"/>
                <Item id="OZ" pid="Z" dv="0.0" nDim="3D" help="Z coordinate"/>
            </Container>
            <Container id="NormalToPlane" pid="Normal to plane" help="Normal to the plane">
                <Item id="NX" pid="X" dv="0.0" help="X coordinate"/>
                <Item id="NY" pid="Y" dv="0.0" help="Y coordinate"/>
                <Item id="NZ" pid="Z" dv="0.0" nDim="3D" help="Z coordinate"/>
            </Container>
        </Template>
        <Template id="HistoryOutputOnPoints" icon="outputgraph.gif" help="History output on points properties">
            <Container id="HistoryGraph" pid="History graph" help="History graph properties">
                <Item id="Px" pid="X" dv="0.0" help="X coordinate of the output point"/>
                <Item id="Py" pid="Y" dv="0.0" help="Y coordinate of the output point" sbi="PickCoordinates" sbp="Pick" sbxp="Px,Py,Pz"/>
                <Item id="Pz" pid="Z" dv="0.0" nDim="3D" help="Z coordinate of the output point"/>
                <Item id="VariableId2d" pid="Variable" nDim="2D" ivalues="Pressure,Velocity" values="Pressure,Velocity" help="Variable to be plotted for this output point"/>
                <Item id="VariableId3d" pid="Variable" nDim="3D" ivalues="Pressure,Velocity" values="Pressure,Velocity" help="Variable to be plotted for this output point"/>
                <Item id="FileId" pid="Output file" dv="" help="Output file identifier"/>
            </Container>
        </Template>
        <Template id="DragProperties" icon="dragforce.gif" help="Drag calculation properties">
            <Container id="MainProperties" pid="Properties" state="hidden" help="Properties">
                <Item id="OutputFileId" pid="Output file Id" dv="" help="Output file identifier"/>
            </Container>
        </Template>
        <Template id="NewCurveId" pid="Curve Id" help="Curve Identifier">
            <Item id="CurveType" pid="Curve Type" dv="ByPoints" ivalues="ByPoints" help="Type of curve"/>
            <Item id="XVar" pid="X Variable" dv="Time" ivalues="Time,Temperature" help="Type of curve"/>
            <Item id="YVar" pid="Y Variable" dv="YoungModulus" ivalues="YoungModulus,More" help="Type of curve"/>
            <ContainerTable id="Points" pid="Points" dv="0" help="Curve Points">
                <TItem id="1" Xval="0" Yval="0"/>
            </ContainerTable>
        </Template>
    </Templates>
    <GlobalProjectSettings>
        <Item id="ValidateModel" pid="Validate model before calculate" dv="1" state="normal" widget="check" help=""/>
        <Item id="CheckSpdVersion" pid="Check problem type version" dv="1" state="normal" widget="check" help=""/>
        <Item id="WriteAllGiDGroups" pid="Write all GiD groups" dv="0" widget="check" state="hidden" help="Write all GiD groups to the Kratos meshes"/>
        <Item id="StartUpWizard" pid="Use start up wizard" dv="1" state="normal" widget="check" help=""/>
    </GlobalProjectSettings>
    <ClassConfiguration>
        <Class>FSF-GiDFileFlag,timeIntMeth,nDim,axiSym,kinemType,strucType,soluType,analysType,velocityLinearSolvTyp,monolithicLinearSolvTyp,pressureLinearSolvTyp,linearSolvTyp,solverType,fluidSolvTyp,fluidType,fluidAppr,freeSurf,convCriteria,application,deltatimetype,TurbulenceModelType,UseCuts,monolithiciterativesolvertype,PSolutionType,ErgunEquationType,BaseCFType,cddeltatimetype,CDLinearSolverType,CD-soluType,DEM-deltatimetype,DEM-BBox,DEM-BBoxType,CDAnalysisType,PressureIterativeSolverType,VelocityIterativeSolverType,CD-soluType</Class>
    </ClassConfiguration>
</Kratos_Data>`
