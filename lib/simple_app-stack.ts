import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import * as efs from '@aws-cdk/aws-efs';

export class SimpleAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaRole = new iam.Role(scope, 'simpleLambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      description: "a simple role for the app's only lambda function",
      roleName: 'simpleLambdaRole',
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSLambdaBasicExecutionRole')
      ]
    });

    const lambdaFunction = new lambda.NodejsFunction(scope, 'simpleLambdaFunction', {
      role: lambdaRole,
      description: "a simple function that does anything of particular interest for the moment",
      functionName: 'simpleLambdaFunction'
    });

  }
}
